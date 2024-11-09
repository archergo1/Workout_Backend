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

  // We need to do this check because if the id is not valid, we will have an internal error and the app will crash
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

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    // 利用 Workout 這個model 來創建一筆新的資料
    const workout = await Workout.create({ title, load, reps });
    // 這裡要加上 return ，避免出現Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    return res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  res.json({ message: "POST A SINGLE WORKOUT" });
};
// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // We need to do this check because if the id is not valid, we will have an internal error and the app will crash
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "NO SUCH WORKOUT" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  // We need to do this check because if the id is not valid, we will have an internal error and the app will crash
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "NO SUCH WORKOUT" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
