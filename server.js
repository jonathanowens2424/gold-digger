// create the server using HTTP
import http from "node:http";
import generateGoldPrice from "./util/generateGoldPrice.js";
import serveStatic from "./util/serveStatic.js";
import path from "node:path";
import { getData } from "./util/getData.js";
import { handleGet, handlePost } from "./handlers/routeHandlers.js";
import sendResponse from "./util/sendResponse.js";
import parseJSONBody from "./util/parseJSONBody.js";

const __dirname = import.meta.dirname;
const publicDir = path.join(__dirname, "public");

const PORT = 8000;

console.log(await getData());

const server = http.createServer(async (req, res) => {
  //loading chunks

  if (req.url === "/api") {
    if (req.method === "GET") {
      return handleGet(res);
    } else if (req.method === "POST") {
      return await handlePost(req, res);
    }
  }

  if (req.url === "/live-prices") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const interval = setInterval(() => {
      const goldPrice = generateGoldPrice();

      res.write(
        `data: ${JSON.stringify({
          event: "goldPriceUpdated",
          goldPrice: goldPrice,
        })}\n\n`,
      );
    }, 1000);

    // Clean up when client disconnects
    req.on("close", () => {
      clearInterval(interval);
      console.log("Client disconnected from SSE");
    });

    return; // Don't fall through
  }

  // Handle static files for everything else
  return await serveStatic(req, res, __dirname);
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
