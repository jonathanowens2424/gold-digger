// create the server using HTTP
import http from "node:http";
import generateGoldPrice from "./util/generateGoldPrice.js";
import serveStatic from "./util/serveStatic.js";
import path from "node:path";

const __dirname = import.meta.dirname;
const publicDir = path.join(__dirname, "public");

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  await serveStatic(req, res, __dirname);
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
