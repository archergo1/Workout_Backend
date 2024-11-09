const express = require("express");
const Workout = require("../models/workoutModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "GET ALL WORKOUTS" });
});

router.get("/:id", (req, res) => {
  res.json({ message: "GET A SINGLE WORKOUT" });
});

router.post("/", async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    // 利用 Workout 這個model 來創建一筆新的資料
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }

  res.json({ message: "POST A SINGLE WORKOUT" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE A SINGLE WORKOUT" });
});

router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE A SINGLE WORKOUT" });
});

module.exports = router;
