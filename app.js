var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var logger = require("morgan");
var app = express();
var flash = require("express-flash");
var cors = require("cors");
app.use(flash());
require("dotenv").config();
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60 * 24 * 7 },
  })
);

app.use(
  "/sbadmin",
  express.static(
    path.join(__dirname, "/node_modules/startbootstrap-sb-admin-2")
  )
);

app.use(cors());

const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL);

const adminRouter = require("./app/admin/routes");
const clientRouter = require("./app/client/routes");
const api = require("./app/api/soal/routes");
const auth = require("./app/auth/routes");
const { middleware, logOut } = require("./app/auth/controller/middleware");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", auth);
app.use("/logout", logOut);
app.use(
  "/client",
  middleware,
  function (req, res, next) {
    res.locals.user = req.session.user;
    next();
  },
  clientRouter
);
app.use(
  "/admin",
  middleware,
  function (req, res, next) {
    res.locals.user = req.session.user;
    next();
  },
  adminRouter
);
app.use("/api/v1", api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (req.session.user.role == "admmin") {
    res.status(404).render("404");
  } else {
    next(createError(404));
  }
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
