import puppeteer, { Browser, Page } from "puppeteer-core";
import path from "path";

const CHROME_PATH = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export interface ChromeCheckOptions {
  url: string;
  outputPath?: string;
  viewport?: { width: number; height: number; isMobile?: boolean };
  sessionCookie?: string;
  waitForSelector?: string;
}

export async function capturePageScreenshot(options: ChromeCheckOptions): Promise<{
  path: string;
  title: string;
  metrics: {
    headingsCount: number;
    linksCount: number;
    hasProse: boolean;
  };
}> {
  const browser: Browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  });

  try {
    const page: Page = await browser.newPage();
    const vp = options.viewport || { width: 1280, height: 800 };
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: !!vp.isMobile,
      hasTouch: !!vp.isMobile,
    });

    if (options.sessionCookie) {
      await page.setCookie({
        name: "pb_session",
        value: options.sessionCookie,
        domain: "localhost",
        path: "/",
        httpOnly: true,
      });
    }

    const fullUrl = options.url.startsWith("http") ? options.url : `${BASE_URL}${options.url}`;
    await page.goto(fullUrl, { waitUntil: "networkidle2" });

    if (options.waitForSelector) {
      await page.waitForSelector(options.waitForSelector, { timeout: 5000 });
    }

    const outPath =
      options.outputPath ||
      `/tmp/chrome_${options.url.replace(/[^a-z0-9_-]/gi, "_")}_${vp.width}x${vp.height}.png`;

    await page.screenshot({ path: outPath, fullPage: false });

    const title = await page.title();
    const metrics = await page.evaluate(() => {
      return {
        headingsCount: document.querySelectorAll("h1, h2, h3").length,
        linksCount: document.querySelectorAll("a").length,
        hasProse: document.querySelectorAll(".prose").length > 0,
      };
    });

    return { path: outPath, title, metrics };
  } finally {
    await browser.close();
  }
}
