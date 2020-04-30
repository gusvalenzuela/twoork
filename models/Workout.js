const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now(),
  },
  exercises: {
    type: {
      type: String,
    },
    cardio: {
      type: Boolean,
      // default: false,
    },
    name: String,
    duration: Number,
    distance: Number,
    weight: Number,
    reps: Number,
    sets: Number,
  },
  dateEntered: {
    type: Date,
    default: Date.now(),
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
