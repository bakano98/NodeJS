const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

// set route, then set handlers for requests
promoRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;;
    res.setHeader('Content-Type', 'text/plain');
    // pass down to the following
    next();
  })
  .get((req, res, next) => {
    res.end("Sending promotions to you");
  })
  .post((req, res, next) => {
    res.end("Adding new promotion for: " + req.body.name + ", promoted to: " + req.body.promoDetails);
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end(`ERR: ${res.statusCode} PUT not supported for promotions`);
  })
  .delete((req, res, next) => {
    res.end("WARNING: deleting all promotions");
  })

promoRouter.route('/:promoId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Getting promotion details of " + req.params.promoId);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`ERR: ${res.statusCode} POST request not supported for promotions`);
  })
  .put((req, res, next) => {
    res.write("You're either really evil or good. Either way...\n");
    res.end("Modifying promotion of " + req.params.promoId + " reason: " + req.body.reason);
  })
  .delete((req, res, next) => {
    res.end("Deleting promotion of " + req.params.promoId);
  })

module.exports = promoRouter;