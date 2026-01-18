// create the server using HTTP
import http from "node:http";
import generateGoldPrice from "./util/generateGoldPrice.js";
import serveStatic from "./util/serveStatic.js";
import path from "node:path";
import { getData } from "./util/getData.js";

const __dirname = import.meta.dirname;
const publicDir = path.join(__dirname, "public");

const PORT = 8000;

console.log(await getData());

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith("/live-prices")) {
    return await serveStatic(req, res, __dirname);
  } else if (req.url === "/live-prices") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    setInterval(() => {
      const goldPrice = generateGoldPrice();
      res.write(
        `data: ${JSON.stringify({
          event: "goldPriceUpdated",
          goldPrice: goldPrice,
        })}\n\n`,
      );
    }, 1000);
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
