// Server-side only: reads storage credentials from the environment.
import { randomUUID } from "node:crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/** Upload categories and what each one accepts. */
export const UPLOAD_KINDS = {
  image: {
    maxBytes: 4 * 1024 * 1024,
    types: {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
      "image/avif": "avif",
    },
  },
  document: {
    maxBytes: 4 * 1024 * 1024,
    types: {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "application/pdf": "pdf",
    },
  },
} as const satisfies Record<string, { maxBytes: number; types: Record<string, string> }>;

export type UploadKind = keyof typeof UPLOAD_KINDS;

/** Folders uploads may be written to, so callers can't pick arbitrary key prefixes. */
export const UPLOAD_FOLDERS = ["avatars", "articles", "projects", "achievements", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];

export class UploadError extends Error {}

let client: S3Client | null = null;

function getConfig() {
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  const bucket = process.env.S3_BUCKET || "media";
  if (!endpoint || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new UploadError("File storage is not configured on the server.");
  }
  // Objects are served publicly via path-style URLs unless a CDN/base URL is configured.
  const publicBaseUrl = (process.env.S3_PUBLIC_BASE_URL || `${endpoint.replace(/\/+$/, "")}/${bucket}`).replace(/\/+$/, "");
  return { endpoint, bucket, publicBaseUrl };
}

function getClient() {
  if (!client) {
    const { endpoint } = getConfig();
    client = new S3Client({
      region: process.env.AWS_REGION || "us-east-1",
      endpoint,
      forcePathStyle: true,
    });
  }
  return client;
}

/** Checks the file's leading bytes so a renamed file can't pass as another type. */
function matchesSignature(bytes: Uint8Array, mime: string): boolean {
  const startsWith = (sig: number[], offset = 0) => sig.every((b, i) => bytes[offset + i] === b);
  switch (mime) {
    case "image/jpeg":
      return startsWith([0xff, 0xd8, 0xff]);
    case "image/png":
      return startsWith([0x89, 0x50, 0x4e, 0x47]);
    case "image/gif":
      return startsWith([0x47, 0x49, 0x46, 0x38]);
    case "image/webp":
      return startsWith([0x52, 0x49, 0x46, 0x46]) && startsWith([0x57, 0x45, 0x42, 0x50], 8);
    case "image/avif":
      return startsWith([0x66, 0x74, 0x79, 0x70], 4);
    case "application/pdf":
      return startsWith([0x25, 0x50, 0x44, 0x46]);
    default:
      return false;
  }
}

export async function uploadFile({
  file,
  userId,
  folder,
  kind,
}: {
  file: File;
  userId: string;
  folder: UploadFolder;
  kind: UploadKind;
}): Promise<{ url: string; key: string }> {
  const rules = UPLOAD_KINDS[kind];
  const ext = (rules.types as Record<string, string>)[file.type];
  if (!ext) {
    throw new UploadError(`Unsupported file type. Allowed: ${Object.values(rules.types).join(", ")}.`);
  }
  if (file.size === 0) {
    throw new UploadError("The selected file is empty.");
  }
  if (file.size > rules.maxBytes) {
    throw new UploadError(`File is too large. Maximum size is ${Math.round(rules.maxBytes / 1024 / 1024)} MB.`);
  }

  const body = new Uint8Array(await file.arrayBuffer());
  if (!matchesSignature(body, file.type)) {
    throw new UploadError("The file contents don't match its type.");
  }

  const { bucket, publicBaseUrl } = getConfig();
  const key = `${folder}/${userId}/${randomUUID()}.${ext}`;

  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: file.type,
      ContentDisposition: "inline",
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return { url: `${publicBaseUrl}/${key}`, key };
}
