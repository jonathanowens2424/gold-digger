import path from "node:path";
import sendResponse from "./sendResponse.js";
import fs from "node:fs/promises";
import getContentType from "./getContentType.js";

export default async function serveStatic(req, res, baseDirectory) {
  const filePath = path.join(
    baseDirectory,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  try {
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    sendResponse(res, 200, getContentType(ext), content);
  } catch (err) {
    console.log(err);
  }
}
