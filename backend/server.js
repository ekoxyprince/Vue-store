import app from "./app.js";
import http from "node:http";

const server = http.createServer(app);
server.listen(8000, () => {
  console.log("running on port 8000");
});
