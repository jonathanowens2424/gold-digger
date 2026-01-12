// create the server using HTTP
import http from "node:http";
import generateGoldPrice from "./util/generateGoldPrice.js";
import serveStatic from "./util/serveStatic.js";
import path from "node:path";
import fs from "node:fs";

const __dirname = import.meta.dirname;

const PORT = 8000;

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/gold-digger")) {
    const pathToResource = serveStatic(__dirname);
    fs.readFile(pathToResource, "utf8", (err, content) => {
      if (err) {
        console.log(err);
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(content);
    });
  } else {
    //find file path
    //serve 404.page
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 404;
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
