const express = require("express");
const bodyParser = require("body-parser");

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })

  .get((req, res, next) => {
    res.end("Dishes data is available");
  })

  .post((req, res, next) => {
    res.end(`Dishes name: ${req.body.name} with details: ${req.body.details}`);
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("Put Operation is not supported");
  })

  .delete((req, res, next) => {
    res.end("Deleted Operation");
  });

//Building api endpoints for dishId routes

dishRouter
  .route("/:dishId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })

  .get((req, res, next) => {
    res.end(
      `Received request from ${req.params.dishId} Dishes data is available`
    );
  })

  .post((req, res, next) => {
    res.end(
      ` Received request from ${req.params.dishId} Dishes name: ${req.body.name} with details: ${req.body.details}`
    );
  })

  .put((req, res, next) => {
    res.write(`Received request from ${req.params.dishId}`);
    res.end(`Dishes name: ${req.body.name} with details: ${req.body.details}`);
  })

  .delete((req, res, next) => {
    res.end("Deleting dish :"+ req.params.dishId);
  });

module.exports = dishRouter;
