const express = require('express');
const bodyParser = require('body-parser');

// create router
const leaderRouter = express.Router();

// use bodyparser
leaderRouter.use(bodyParser.json());

// set route, then handle requests
leaderRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end("Sending details of all leaders to you");
  })
  .post((req, res, next) => {
    res.end(`Adding new leader:\n
    name: ${req.body.name}\n
    reason: ${req.body.reason}`);
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end(`ERR: ${res.statusCode} PUT requests not supported for /leader`);
  })
  .delete((req, res, next) => {
    res.end("WARNING: Deleting information of ALL leaders");
  })


leaderRouter.route('/:leaderId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res, next) => {
    res.end(`Getting details of leader ${req.params.leaderId}`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`ERR: ${res.statusCode} POST not supported for /leader/${req.params.leaderId}`);
  })
  .put((req, res, next) => {
    res.write("Damn boi you really want to edit this?\n");
    res.end(`Modifying details of leader ${req.params.leaderId} to:\n name: ${req.body.name}\n reason: ${req.body.reason}`);
  })
  .delete((req, res, next) => {
    res.end(`Deleting details of leader ${req.params.leaderId}`);
  })

module.exports = leaderRouter;