// Requiring our models
const db = require(`../models`);
const moment = require(`moment`);
// const mongoose = require("mongoose");
// const utils = require("../utils/utils")

// Routes
// =============================================================
module.exports = function (app) {
  // Basic route that sends the user first to the AJAX Page
  app.get(`/`, (req, res) => {
    // res.send()
    db.Workout.find({})
      .sort({ day: -1 })
      .then((workout) => {
        workout.forEach((i) => {
          i.poop = `poop`;
        });
        // console.log(workout.json())
        res.render(`index`, { workout: workout });
      })
      .catch((err) => {
        res.json(err);
      });
  });
  app.get(`/exercise`, (req, res) => {
    // res.send()
    db.Workout.find({})
      .sort({ day: -1 })
      .then((workout) => {
        res.render(`exercise`, {
          day: workout.day,
          exercises: workout.exercises,
        });
      })
      .catch((err) => {
        res.json(err);
      });
  });
  app.get(`/stats`, (req, res) => {
    // res.send()
    res.render(`stats`);
  });
};
