"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { TextSelection } from "@tiptap/pm/state";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Code,
  FileCode,
  Link2,
  Unlink,
  Minus,
  Undo2,
  Redo2,
  RemoveFormatting,
  Check,
  X,
  Sparkles,
  ImagePlus,
  Loader2,
} from "lucide-react";
import { markdownToHtml } from "@/lib/rich-text";
import { UPLOAD_ACCEPT, uploadToStorage, type UploadFolder } from "@/lib/upload-client";

interface RichTextEditorProps {
  id?: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  minHeight?: string;
  required?: boolean;
  className?: string;
  onChange?: (html: string) => void;
  /** When set, enables image upload (toolbar, paste, drag & drop) into this storage folder. */
  imageUploadFolder?: UploadFolder;
}

export function RichTextEditor({
  id,
  name,
  defaultValue = "",
  placeholder = "Write and format your content using the toolbar buttons...",
  minHeight = "240px",
  required = false,
  className = "",
  onChange,
  imageUploadFolder,
}: RichTextEditorProps) {
  // Seed with the initial content so an untouched editor still submits it.
  const [htmlValue, setHtmlValue] = useState(() =>
    defaultValue ? markdownToHtml(defaultValue) : ""
  );
  const [isLinkPromptOpen, setIsLinkPromptOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [pendingUploads, setPendingUploads] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  // Lets editor paste/drop handlers (created once) call the latest upload function.
  const insertImagesRef = useRef<(files: File[]) => void>(() => {});

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        link: false,
        underline: false,
        trailingNode: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-sky-400 underline hover:text-sky-300 font-medium",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      // Always registered so existing images in content survive editing.
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content: defaultValue ? markdownToHtml(defaultValue) : "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        id: id || name,
        class:
          "prose dark:prose-invert max-w-none text-zinc-100 p-4 sm:p-5 focus:outline-none leading-normal prose-p:my-1 prose-li:my-0.5 prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-100 prose-h1:text-2xl sm:prose-h1:text-3xl prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-lg sm:prose-h3:text-xl prose-a:text-sky-400 prose-blockquote:border-l-2 prose-blockquote:border-sky-500/60 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-300 prose-pre:bg-zinc-950/90 prose-pre:border prose-pre:border-zinc-800 prose-pre:p-4 prose-pre:rounded-xl prose-code:text-sky-300 prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-hr:border-zinc-800",
        style: `min-height: ${minHeight};`,
      },
      handlePaste: (_view, event) => {
        const files = imageFilesFrom(event.clipboardData?.files);
        if (!imageUploadFolder || files.length === 0) return false;
        event.preventDefault();
        insertImagesRef.current(files);
        return true;
      },
      handleDrop: (view, event, _slice, moved) => {
        const files = imageFilesFrom(event.dataTransfer?.files);
        if (moved || !imageUploadFolder || files.length === 0) return false;
        event.preventDefault();
        // Place the caret where the files were dropped so images land there.
        const coords = view.posAtCoords({ left: event.clientX, top: event.clientY });
        if (coords) {
          view.dispatch(view.state.tr.setSelection(TextSelection.near(view.state.doc.resolve(coords.pos))));
        }
        insertImagesRef.current(files);
        return true;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.isEmpty ? "" : editor.getHTML();
      setHtmlValue(html);
      onChange?.(html);
    },
  });

  // Uploads images in parallel, then inserts the successful ones (in order) at the caret.
  const insertImages = async (files: File[]) => {
    if (!editor || !imageUploadFolder || files.length === 0) return;
    setUploadError(null);
    setPendingUploads((n) => n + files.length);

    const results = await Promise.allSettled(files.map((file) => uploadToStorage(file, imageUploadFolder, "image")));
    setPendingUploads((n) => n - files.length);

    const images = results.flatMap((r, i) =>
      r.status === "fulfilled"
        ? [{ type: "image", attrs: { src: r.value, alt: files[i].name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ") } }]
        : []
    );
    const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
    if (failures.length > 0) {
      const reason = failures[0].reason instanceof Error ? failures[0].reason.message : "Upload failed.";
      setUploadError(failures.length === 1 ? reason : `${failures.length} images failed to upload. ${reason}`);
    }
    if (images.length === 0 || editor.isDestroyed) return;

    // Insert after the current block (not replacing a selected image), followed by
    // an empty paragraph so writing can continue below the images.
    // An empty paragraph at the caret is replaced instead of leaving a blank gap.
    const { $to } = editor.state.selection;
    const block = $to.depth > 0 ? $to.node(1) : null;
    const insertAt =
      block && block.isTextblock && block.content.size === 0
        ? { from: $to.before(1), to: $to.after(1) }
        : $to.depth > 0
          ? $to.after(1)
          : $to.pos;
    editor
      .chain()
      .focus()
      .insertContentAt(insertAt, [...images, { type: "paragraph" }])
      .run();
  };
  useEffect(() => {
    insertImagesRef.current = (files) => void insertImages(files);
  });

  // Keep internal state aligned if defaultValue changes
  useEffect(() => {
    if (editor && defaultValue !== undefined) {
      const initialHtml = defaultValue ? markdownToHtml(defaultValue) : "";
      if (editor.getHTML() !== initialHtml && editor.isEmpty) {
        editor.commands.setContent(initialHtml);
        setHtmlValue(initialHtml);
      }
    }
  }, [defaultValue, editor]);

  // Helper to split any hard breaks (<br>) within the current selection into distinct paragraphs
  const splitHardBreaks = () => {
    if (!editor) return;
    const { state, view } = editor;
    const { from, to } = state.selection;
    const breakPositions: number[] = [];

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.name === "hardBreak") {
        breakPositions.push(pos);
      }
    });

    if (breakPositions.length > 0) {
      const tr = state.tr;
      for (let i = breakPositions.length - 1; i >= 0; i--) {
        const pos = breakPositions[i];
        tr.delete(pos, pos + 1);
        tr.split(pos);
      }
      view.dispatch(tr);
    }
  };

  const handleToggleHeading = (level: 1 | 2 | 3) => {
    if (!editor) return;
    splitHardBreaks();
    if (editor.isActive("heading", { level })) {
      editor.chain().focus().clearNodes().setParagraph().run();
    } else {
      editor.chain().focus().clearNodes().setHeading({ level }).run();
    }
  };

  const handleToggleParagraph = () => {
    if (!editor) return;
    splitHardBreaks();
    editor.chain().focus().clearNodes().setParagraph().run();
  };

  const handleToggleBulletList = () => {
    if (!editor) return;
    splitHardBreaks();
    if (editor.isActive("bulletList")) {
      editor.chain().focus().clearNodes().setParagraph().run();
    } else {
      editor.chain().focus().clearNodes().toggleBulletList().run();
    }
  };

  const handleToggleOrderedList = () => {
    if (!editor) return;
    splitHardBreaks();
    if (editor.isActive("orderedList")) {
      editor.chain().focus().clearNodes().setParagraph().run();
    } else {
      editor.chain().focus().clearNodes().toggleOrderedList().run();
    }
  };

  const handleToggleBlockquote = () => {
    if (!editor) return;
    if (editor.isActive("blockquote")) {
      editor.chain().focus().clearNodes().setParagraph().run();
    } else {
      editor.chain().focus().clearNodes().toggleBlockquote().run();
    }
  };

  const handleToggleCodeBlock = () => {
    if (!editor) return;
    if (editor.isActive("codeBlock")) {
      editor.chain().focus().clearNodes().setParagraph().run();
    } else {
      editor.chain().focus().clearNodes().toggleCodeBlock().run();
    }
  };

  const handleApplyLink = () => {
    if (!editor) return;
    if (linkUrl.trim()) {
      let url = linkUrl.trim();
      if (!/^https?:\/\//i.test(url) && !url.startsWith("/") && !url.startsWith("#")) {
        url = `https://${url}`;
      }
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setLinkUrl("");
    setIsLinkPromptOpen(false);
  };

  const handleRemoveLink = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  };

  return (
    <div
      className={`w-full rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-xl focus-within:border-sky-500/50 transition-colors flex flex-col ${className}`}
    >
      {/* Tiptap Visual Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-zinc-900/90 border-b border-zinc-800/90 rounded-t-2xl overflow-x-auto scrollbar-none flex-wrap">
        {/* Paragraph & Headings */}
        <div className="flex items-center gap-1 pr-2 border-r border-zinc-800">
          <button
            type="button"
            title="Normal Paragraph"
            onMouseDown={(e) => {
              e.preventDefault();
              handleToggleParagraph();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("paragraph") && !editor?.isActive("heading")
                ? "bg-sky-500/20 text-sky-400 font-semibold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Pilcrow className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 1"
            onMouseDown={(e) => {
              e.preventDefault();
              handleToggleHeading(1);
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer font-bold ${
              editor?.isActive("heading", { level: 1 })
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Heading1 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 2"
            onMouseDown={(e) => {
              e.preventDefault();
              handleToggleHeading(2);
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer font-bold ${
              editor?.isActive("heading", { level: 2 })
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Heading 3"
            onMouseDown={(e) => {
              e.preventDefault();
              handleToggleHeading(3);
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer font-bold ${
              editor?.isActive("heading", { level: 3 })
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Heading3 className="h-4 w-4" />
          </button>
        </div>

        {/* Inline Formatting */}
        <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
          <button
            type="button"
            title="Bold (Ctrl+B)"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleBold().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("bold")
                ? "bg-sky-500/20 text-sky-400 font-bold border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Italic (Ctrl+I)"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleItalic().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("italic")
                ? "bg-sky-500/20 text-sky-400 font-semibold border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Underline (Ctrl+U)"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleUnderline().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("underline")
                ? "bg-sky-500/20 text-sky-400 font-semibold border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <UnderlineIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Strikethrough"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleStrike().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("strike")
                ? "bg-sky-500/20 text-sky-400 font-semibold border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Strikethrough className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Inline Code"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().toggleCode().run();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("code")
                ? "bg-sky-500/20 text-sky-400 font-mono border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Code className="h-4 w-4" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
          <button
            type="button"
            title="Bulleted List"
            onMouseDown={(e) => {
              e.preventDefault();
              handleToggleBulletList();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("bulletList")
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Numbered List"
            onMouseDown={(e) => {
              e.preventDefault();
              handleToggleOrderedList();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("orderedList")
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Blockquote"
            onMouseDown={(e) => {
              e.preventDefault();
              handleToggleBlockquote();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("blockquote")
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Code Block"
            onMouseDown={(e) => {
              e.preventDefault();
              handleToggleCodeBlock();
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("codeBlock")
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <FileCode className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Divider Line"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().setHorizontalRule().run();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
          <button
            type="button"
            title="Insert Link"
            onMouseDown={(e) => {
              e.preventDefault();
              setIsLinkPromptOpen((prev) => !prev);
            }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              editor?.isActive("link") || isLinkPromptOpen
                ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <Link2 className="h-4 w-4" />
          </button>
          {editor?.isActive("link") && (
            <button
              type="button"
              title="Remove Link"
              onMouseDown={(e) => {
                e.preventDefault();
                handleRemoveLink();
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <Unlink className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Images */}
        {imageUploadFolder && (
          <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
            <button
              type="button"
              title="Insert Images (or paste / drag & drop)"
              disabled={!editor}
              onMouseDown={(e) => {
                e.preventDefault();
                imageInputRef.current?.click();
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {pendingUploads > 0 ? <Loader2 className="h-4 w-4 animate-spin text-sky-400" /> : <ImagePlus className="h-4 w-4" />}
              {pendingUploads > 0 && <span className="text-[11px] text-sky-400">Uploading {pendingUploads}…</span>}
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept={UPLOAD_ACCEPT.image}
              multiple
              className="hidden"
              aria-label="Upload images into content"
              onChange={(e) => {
                const files = imageFilesFrom(e.target.files);
                e.target.value = "";
                void insertImages(files);
              }}
            />
          </div>
        )}

        {/* History & Clear */}
        <div className="flex items-center gap-1 pl-2">
          <button
            type="button"
            title="Undo (Ctrl+Z)"
            disabled={!editor?.can().undo()}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().undo().run();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Redo (Ctrl+Y)"
            disabled={!editor?.can().redo()}
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().redo().run();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <Redo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Clear Formatting"
            onMouseDown={(e) => {
              e.preventDefault();
              editor?.chain().focus().unsetAllMarks().clearNodes().run();
            }}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Inline Link Prompt Drawer */}
      {isLinkPromptOpen && (
        <div className="p-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <Link2 className="h-4 w-4 text-sky-400 shrink-0 ml-1" />
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleApplyLink();
              } else if (e.key === "Escape") {
                e.preventDefault();
                setIsLinkPromptOpen(false);
              }
            }}
            placeholder="Type or paste URL (e.g. https://example.com)..."
            autoFocus
            className="flex-1 h-8 px-3 rounded-lg bg-zinc-950 border border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              handleApplyLink();
            }}
            className="h-8 px-3 rounded-lg bg-sky-500 hover:bg-sky-400 text-black text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Apply</span>
          </button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              setIsLinkPromptOpen(false);
            }}
            className="h-8 px-2.5 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {uploadError && (
        <div className="px-3 py-2 bg-red-500/10 border-b border-red-500/30 text-xs text-red-400 flex items-center justify-between gap-2">
          <span>{uploadError}</span>
          <button type="button" onClick={() => setUploadError(null)} className="text-red-300 hover:text-white cursor-pointer" aria-label="Dismiss">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Tiptap Editor Content Area */}
      <div className="relative flex-1">
        <EditorContent editor={editor} />
      </div>

      {/* Synchronized hidden input for standard Next.js Server Actions */}
      <input type="hidden" name={name} value={htmlValue} required={required} />
    </div>
  );
}

function imageFilesFrom(list: FileList | null | undefined): File[] {
  return Array.from(list ?? []).filter((f) => f.type.startsWith("image/"));
}
