// create the server using HTTP
import http from "node:http";
import generateGoldPrice from "./util/generateGoldPrice.js";
import serveStatic from "./util/serveStatic.js";
import path from "node:path";
import fs from "node:fs";
import sendResponse from "./util/sendResponse.js";

const __dirname = import.meta.dirname;

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  await serveStatic(req, res, __dirname);
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
