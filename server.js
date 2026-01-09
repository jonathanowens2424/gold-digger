// create the server using HTTP
import http from "node:http";
import generateGoldPrice from "./util/generateGoldPrice.js";

const PORT = 8000;

const server = http.createServer((req, res) => {
  const randomGoldPrice = generateGoldPrice();
  res.end(`${randomGoldPrice}`);
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
