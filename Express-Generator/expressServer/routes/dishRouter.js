const express = require("express");
const bodyParser = require("body-parser");

var mongoose = require('mongoose');
var User = require('../models/userModel');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter
  .route("/")
  /* .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  }) */

  .get((req, res, next) => {
    User.find({})
    .then((users) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(users);
    }, err => next(err))
    .catch((err) => next(err))
  })

  .post((req, res, next) => {
    User.create(req.body)
    .then(user => {
      console.log("user created", user);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(user);
    },err => next(err))
    .catch((err) => next(err))
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("Put Operation is not supported");
  })

  .delete((req, res, next) => {
    User.remove({})
    .then(response => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(response);
    },err => next(err))
    .catch((err) => next(err))
  });

//Building api endpoints for dishId routes

dishRouter
  .route("/:dishId")
  /* .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })
 */
  .get((req, res, next) => {
    User.findById(req.params.dishId)
    .then((user) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(user);
    }, err => next(err))
    .catch((err) => next(err))

  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("Post Operation is not supported");
    /* res.end(
      ` Received request from ${req.params.dishId} Dishes name: ${req.body.name} with details: ${req.body.details}`
    ); */
  })

  .put((req, res, next) => {
    User.findByIdAndUpdate(req.params.dishId, {
      $set:req.body
    },{new : true})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(user);
    }, err => next(err))
    .catch((err) => next(err))
  })

  .delete((req, res, next) => {
    User.findByIdAndDelete(req.params.dishId)
    .then(response => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(response);
    },err => next(err))
    .catch((err) => next(err))
  });

module.exports = dishRouter;
