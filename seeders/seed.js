let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/twoorkdb", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

let workoutSeed = [
  {
    day: new Date().setDate(new Date().getDate() - 10),
    dateEntered: new Date(),
    exercises: [
      {
        type: "resistance",
        cardio: false,
        name: "Bicep Curl",
        duration: 20,
        weight: 100,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date().setDate(new Date().getDate() - 9),
    dateEntered: new Date(),
    exercises: [
      {
        type: "resistance",
        cardio: false,
        name: "Lateral Pull",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4,
      },
    ],
  },
  {
    day: new Date().setDate(new Date().getDate() - 8),
    dateEntered: new Date(),
    exercises: [
      {
        type: "resistance",
        cardio: false,
        name: "Push Press",
        duration: 25,
        weight: 185,
        reps: 8,
        sets: 4,
      },
    ],
  },
  {
    day: new Date().setDate(new Date().getDate() - 7),
    dateEntered: new Date(),
    exercises: [
      {
        type: "cardio",
        cardio: true,
        name: "Running",
        duration: 25,
        distance: 4,
      },
    ],
  },
  {
    day: new Date().setDate(new Date().getDate() - 1),
    dateEntered: new Date(),
    exercises: [
      {
        type: "cardio",
        cardio: true,
        name: "Walking",
        duration: 25,
        distance: 2,
      },
    ],
  },
];

db.Workout.deleteMany({})
  .then(() => db.Workout.collection.insertMany(workoutSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
