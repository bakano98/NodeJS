// dishRouter will handle all requests to /dishes
// Routers are like mini-express applications
const express = require('express');
const bodyParser = require('body-parser');

// declare this in order to make use of express' routers
const dishRouter = express.Router();

// Explicitly declare the use of bodyParser
dishRouter.use(bodyParser.json());
// route takes in an endpoint. Will mount this in index.js later. Mounting allows for chaining of requests.
// No endpoints required when chaining.
dishRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    // eventually JSON
    res.setHeader('Content-Type', 'text/plaintext');

    // continue to look for additional specifications that match the /dishes endpoint
    next();
  })
  .get((req, res, next) => {
    // from above, .all passes res to HERE.
    res.end('Will send all the dishes to you  !'); // ends handling of GET request
  })
  .post((req, res, next) => {
    // POST carries some information in the body of the POST request as JSON data.
    console.log(req.body);
    // Suppose we have "name" and "description" as the data..
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end(`Error ${res.statusCode} PUT not supported for dishes`);
  })

  .delete((req, res, next) => {
    res.end("Deleting ALL dishes...");
  });

// In order to support parameters, we'll have to declare ANOTHER dishRouter.
// Since we have a route with a parameter, we can remove the remaining in the REST requests.
dishRouter.route('/:dishId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    next();
  })
  .get((req, res, next) => {
    res.end('Will send details of dish ' + req.params.dishId + ' to you'); // now we have a parameter, dishId.
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes' + req.params.dishId);
  })
  .put((req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId);
    res.end('\nWill update the dish: ' + req.body.name + ' with details: ' + req.body.description);
  })
  .delete((req, res, next) => {
    res.end("Deleting dish with dishId: " + req.params.dishId);
  });


// Export it as a module
module.exports = dishRouter;