const express = require("express");
const bodyParser = require("body-parser");

//Importing the routes
const contactRoutes = require("./routes/contacts-routes");
const userRoutes = require("./routes/users-routes");

const port = 5000;
const app = express();
app.use(bodyParser.json());

//Adding the routes
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

//Listening to the port Number
app.listen(port, (error) => {
  if (error) {
    console.log("Something Wrong Happend");
  }
  console.log("Server is running on Port Number", port);
});
