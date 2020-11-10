const express = require("express");
const path = require("path");

const app = express(); // create express app

app.use(express.static(path.join(__dirname, "..", "build")));

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
