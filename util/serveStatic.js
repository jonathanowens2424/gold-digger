import path from "node:path";
import sendResponse from "./sendResponse.js";
import fs from "node:fs/promises";

export default async function serveStatic(req, res, baseDirectory) {
  const filePath = path.join(baseDirectory, "public", "index.html");
  try {
    const content = await fs.readFile(filePath);
    sendResponse(res, 200, "text/html", content);
  } catch (err) {
    console.log(err);
  }
}
