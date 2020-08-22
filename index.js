const express = require("express");
const http = require("http");
const PORT = process.env.PORT || 4000;
const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);
const fs = require("fs");
const FILE_PATH = "./file.txt";

app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/save", function (req, resp) {
  const data = req.body.data;
  fs.writeFileSync(FILE_PATH, data, { flag: "w" });
  resp.send("saved");
});

app.get("/get", function (req, resp) {
  const data = fs.readFileSync(FILE_PATH);
  resp.send(data);
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
