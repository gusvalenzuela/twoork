// Dependencies
// =============================================================
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require(`compression`);
const db = require("./models");

// const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`Public`));

app.use(logger("dev"));
app.use(compression());

// Set Handlebars.
const exphbs = require(`express-handlebars`);
app.engine(`handlebars`, exphbs({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);

//Set Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/twoorkdb", {
  useNewUrlParser: true,
});

require(`./routes/html-api-routes`)(app)
require(`./routes/workouts-api-routes`)(app)

app.listen(PORT, () => {
  console.log(`\r\n${`*`.repeat(16)}\r\n[Twoork App] listening on {localhost:${PORT}}...\r\n${`*`.repeat(16)}`);
});
