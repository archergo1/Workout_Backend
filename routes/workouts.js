const express = require("express");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
} = require("../controllers/workoutController");
const router = express.Router();

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE A SINGLE WORKOUT" });
});

router.patch("/:id", (req, res) => {
  res.json({ message: "UPDATE A SINGLE WORKOUT" });
});

module.exports = router;
