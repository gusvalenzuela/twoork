// Requiring our models
const db = require(`../models`);
var mongoose = require("mongoose");
// const utils = require("../utils/utils")

// Routes
// =============================================================
module.exports = function (app) {
  // B
  app.get(`/api/workouts`, (req, res) => {
    db.Workout.find({}, (err, result) =>
      err ? res.send(err) : res.send(result)
    );
  });

  app.get(`/api/workouts/range`, (req, res) => {

    db.Workout.aggregate([
      // match in a date range?
      // { $match: {
      //     _id: null
      // }},
      { $unwind: "$exercises" },
      { $group: {
          "_id": "$exercises.name",
           totalduration: { $sum: "$exercises.duration"  },
           totalreps: { $sum: "$exercises.reps"  },
           totaldistance: { $sum: "$exercises.distance"  },
           totalweight: { $sum: "$exercises.weight"  },
          //  totalreps: { $sum: "$exercises.reps"  },
      }}
  ], (err, result) =>
      err ? res.send(err) : res.send(result)
    );
  });

  app.put("/api/workouts/:id", ({ body, params }, res) => {
    db.Workout.update(
      { _id: mongoose.Types.ObjectId(params.id) },
      { $push: { exercises: body } },
      (err, result) => (err ? res.send(err) : res.send(result))
    );
  });
  app.post("/api/workouts/", ({ body}, res) => {
    console.log(body);
    db.Workout.create(body, (err, result) => {
      err ? res.send(err) : res.send(result);
    });
  });

  app.delete(`/api/exercise/:id`, function (req, res) {
    // We just have to specify which request we want to destroy with `where`
    db.Workout.destroy({
      where: {
        id: req.params.id,
      },
    }).then((response) => {
      res.json(response);
    });
  });
};
