// create the server using HTTP
import http from "node:http";
import generateGoldPrice from "./util/generateGoldPrice.js";
import serveStatic from "./util/serveStatic.js";
import path from "node:path";

const __dirname = import.meta.dirname;
const publicDir = path.join(__dirname, "public");

const PORT = 8000;

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
      console.log(goldPrice);
      res.write(
        `data: ${JSON.stringify({
          event: "goldPriceUpdated",
          goldPrice: goldPrice,
        })}\n\n`
      );
    }, 5000);
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
