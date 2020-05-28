const express = require("express");

const bodyParser = require("body-parser");
const port = 5000;
const app = express();

app.listen(port, (error) => {
  if (error) {
    console.log("Something Wrong Happend");
  }
  console.log("Server is running on Port Number", port);
});
