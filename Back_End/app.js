var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
const cors = require("cors");
// Connect to database
const database = require("./connect");
database.connect();

var indexRouter = require("./routes/index");
var genreRouter = require("./routes/genre");
var userRouter = require("./routes/user");
var seatsRouter = require("./routes/seats");
var roomsRouter = require("./routes/room");
var screensRouter = require("./routes/screening");
var ticketRouter = require("./routes/ticket");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
// đinh nghĩa router
app.use("/", indexRouter);
app.use("/genre", genreRouter);
app.use("/users", userRouter);
app.use("/seats", seatsRouter);
app.use("/rooms", roomsRouter);
app.use("/screenings", screensRouter);
app.use("/ticket", ticketRouter);

// connect to the db

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
