import path from "node:path";
import sendResponse from "./sendResponse.js";
import fs from "node:fs/promises";
import getContentType from "./getContentType.js";
import { URL } from "url";

export default async function serveStatic(req, res, baseDirectory) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const filePath = path.join(
    baseDirectory,
    "public",
    pathname === "/" ? "index.html" : pathname
  );
  try {
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    const contentType = getContentType(ext);
    sendResponse(res, 200, contentType, content);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(baseDirectory);
      const content = await fs.readFile(
        path.join(baseDirectory, "public", "404.html")
      );
      sendResponse(res, 404, "text/html", content);
    } else {
      sendResponse(
        res,
        500,
        "text/html",
        `<html><h1>Server Error: ${err.code}</h1></html>`
      );
    }
  }
}
