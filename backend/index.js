const express = require("express");
const bodyParser = require("body-parser");

//Importing the routes
const contactRoutes = require("./routes/contacts-routes");
const userRoutes = require("./routes/users-routes");

const port = 5000;
const app = express();
//Middlewares

app.use(bodyParser.json());

//Adding the routes
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

//handling errors
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
//Listening to the port Number
app.listen(port, (error) => {
  if (error) {
    console.log("Something Wrong Happend");
  }
  console.log("Server is running on Port Number", port);
});
