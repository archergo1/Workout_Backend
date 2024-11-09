require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
var cors = require("cors");
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());
// app.get("/", (req, res) => {
//   res.json({ message: "WELCOME TO THE APP" });
// });

// routes
app.use("/api/workouts", workoutRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to db & Server is running on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });
