// create the server using HTTP
import http from "node:http";
import generateGoldPrice from "./util/generateGoldPrice.js";

const __dirname = import.meta.dirname;
console.log(__dirname);
const PORT = 8000;

const server = http.createServer((req, res) => {
  const randomGoldPrice = generateGoldPrice();
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(`<html><h1>Gold's price is ${randomGoldPrice}</h1></html>`);
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
