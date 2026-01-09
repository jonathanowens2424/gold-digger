// create the server using HTTP
import http from "node:http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.end("This is from the server!");

  if (req.url.startsWith("/jonathan")) {
    console.log("Hello Jonathan!");
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
