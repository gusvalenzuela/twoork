// Dependencies
// =============================================================
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require(`compression`);
// const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));

app.use(logger("dev"));
app.use(compression());

// Set Handlebars.
const exphbs = require(`express-handlebars`);
app.engine(`handlebars`, exphbs({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);

//Set Mongoose
mongoose.connect(process.env.MONGODB_URX || "mongodb://localhost/twoorkdb", {
  useNewUrlParser: true,
});

require(`./routes/html-api-routes`)(app)
require(`./routes/workouts-api-routes`)(app)

app.get(`/test`, (req, res) => {
  res.render(`test`)
})

app.post(`/test`, (req, res) => {
  
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

  db.Workout.deleteMany({}).then(() => {
    db.Workout.collection
      .insertMany(projectSeed)
      .then((data) => {
        console.log(data.result.n + " records inserted!");
        window.location.href = `/`
      })
      .catch((err) => {
        console.error(err);
        window.location.href = `/`
      });
  });
  
  // db.Workout.deleteMany({})
  //   .then(() => db.Workout.collection.insertMany(workoutSeed))
  //   .then((data) => {
  //     res.send(data)
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
  

});

app.listen(PORT, () => {
  console.log(`\r\n${`*`.repeat(16)}\r\n[Twoork App] listening on {localhost:${PORT}}...\r\n${`*`.repeat(16)}`);
});
