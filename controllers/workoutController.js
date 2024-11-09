const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};
// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "NO SUCH WORKOUT" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};
// create new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    // 利用 Workout 這個model 來創建一筆新的資料
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ Error: err.message });
  }

  res.json({ message: "POST A SINGLE WORKOUT" });
};
// delete a workout

// update a workout

module.exports = { createWorkout, getWorkouts, getWorkout };
