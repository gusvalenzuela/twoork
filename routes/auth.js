const authController = require("../controllers/authcontroller.js");
const utils = require("../utils/utils");

module.exports = function (app, passport) {
  // can only update a workout (bid on homepage) if a user is logged in
  app.put(
    `/api/workouts/:id`,
    utils.isLoggedIn,
    // authController.homepageBidding
  );

  // can only create a workout if a user is logged in on the homepage
  app.post(
    `/api/workouts/`,
    utils.isLoggedIn,
    // authController.homepageContracting
  );

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/signup",
    })
  );

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/signup",
    })
  );

  app.get("/logout", authController.logout);
};
