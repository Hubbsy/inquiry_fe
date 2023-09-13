const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(cors());

// app.use(express.static(path.join(__dirname, "build")));
const staticPath = path.resolve(__dirname, "../build/static");
const buildPath = path.resolve(__dirname, "../build");
const indexPath = path.resolve(__dirname, "../build/index.html");
app.use("/", express.static(buildPath));
app.use("/static", express.static(staticPath));

app.get("/*", (req, res) => {
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
