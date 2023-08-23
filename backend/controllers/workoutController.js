const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

const getWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// const getSingleWorkout = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const workout = await Workout.findById(id);
//     res.status(200).json(workout);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  //checking if id is mongodb compatible id (12 bytes or strings of 24 hex)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" }); //should return it, otherwise will goto next functions
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  //add document to db
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }

  const workout = await Workout.findByIdAndDelete(id); //just id or with _id, both will work
  // const workout = await Workout.findOneAndDelete({ _id: id }); //should provide id with _id, because thats how it saved in mongodb, not mongoose

  if (!workout) {
    return res.status(400).json({ error: "Workout not found" });
  }

  res.status(200).json(workout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout not found" });
  }

  const workout = await Workout.findById(id);

  //make sure logged in user matches the workout user, otherwise any current token can edit other users workout
  if (req.user._id.toString() !== workout.user_id) {
    return res.status(401).json({ error: "User not authorized" });
  }

  const workoutUpdate = await Workout.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  ); //just id or with _id, both will work. new option true for returning the updated value, or it will return previous value before update
  // const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body }); //should provide id with _id, because thats how it saved in mongodb, not mongoose

  if (!workoutUpdate) {
    return res.status(400).json({ error: "Workout not found" });
  }

  res.status(200).json(workoutUpdate);
};

module.exports = {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
