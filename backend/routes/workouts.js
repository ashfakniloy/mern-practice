const express = require("express");
const {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//this middleware will run before all routes to check if user is authenticated.
//it should be placed before all routes to make them procted api
router.use(requireAuth);

router.get("/", getWorkouts);
router.get("/:id", getSingleWorkout);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
