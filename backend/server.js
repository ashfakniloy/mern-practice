require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

//express app
const app = express();

//middleware, will run on every request
app.use(cors());

//this middlare will pass the request body data to req object
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next(); //to move on to next middleware
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to database & listening on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => console.log(err));
