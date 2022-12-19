var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dishRouter = require("./routes/dishRouter");

/* var mongoose = require("mongoose");
var User = require("./models/userModel");

const url = require("./connectionString");
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log("db connection established");
  },
  (err) => console.log("err", err)
); */

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("1234-5678-9012"));

function auth(req, res, next) {
  console.log("req.headers :", req.headers);
  console.log("req.signedCookies.user",req.signedCookies.user)
  if (!req.signedCookies.user){
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error("You are not authorized");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }
  
    console.log("authHeader :", authHeader);
  
    var auth = new Buffer(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    var userName = auth[0];
    var password = auth[1];
  
    if (userName === "admin" && password === "password") {
      res.cookie('user','admin',{signed: true});
      next();
    } else {
      var err = new Error("You are not authorized");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }
  }else{
    if (req.signedCookies.user === 'admin') {
      next();
  }
  else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
  }
  }
  
}

app.use(auth);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/dishes", dishRouter);

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
