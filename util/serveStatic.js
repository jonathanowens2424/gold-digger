import path from "node:path";

export default function serveStatic(baseDirectory) {
  return path.join(baseDirectory, "public", "index.html");
}
