const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Importing the routes
const contactRoutes = require("./routes/contacts-routes");
const userRoutes = require("./routes/users-routes");

const port = 5000;
const app = express();
//Middlewares

app.use(bodyParser.json());
//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

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

//connecting to db

mongoose
  .connect(
    `mongodb+srv://user1:user123@cluster0-am8om.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(() => {
    //Listening to the port Number
    app.listen(5000);
  })
  .catch((err) => {
    console.log("Something Wrong Happend", err);
  });
