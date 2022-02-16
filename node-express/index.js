const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const HOST = "localhost";
const PORT = 3000;

// app will use express' module
const app = express();

// declaring usage of middlewares
// tells app to use morgan
app.use(morgan("dev"));
// tells app to use bodyParser for JSON files
app.use(bodyParser.json());

// setting endpoint for all HTTP requests
app.all('/dishes', (req, res, next) => {
  res.statusCode = 200;
  // eventually JSON
  res.setHeader('Content-Type', 'text/plaintext');

  // continue to look for additional specifications that match the /dishes endpoint
  next();
})

app.get('/dishes', (req, res, send) => {
  // from above, app.all passes res to HERE.
  res.end('Will send all the dishes to you  !'); // ends handling of GET request
})

// POSTing a new dish
app.post('/dishes', (req, res, send) => {
  // POST carries some information in the body of the POST request as JSON data.
  console.log(req.body);
  // Suppose we have "name" and "description" as the data..
  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})


app.put('/dishes', (req, res, send) => {
  res.statusCode = 403;
  res.end(`Error ${res.statusCode} PUT not supported for dishes`);
})

// DANGEROUS OPERATION!! Needs some kind of privilege handling
app.delete('/dishes', (req, res, send) => {
  res.end("Deleting ALL dishes...");
})

// /:dishId indicates a parameter to /dishes with dishId.
app.get('/dishes/:dishId', (req, res, send) => {
  // from above, app.all passes res to HERE.
  res.end('Will send details of dish ' + req.params.dishId + ' to you'); // now we have a parameter, dishId.
})

// POSTing a new dish
app.post('/dishes/:dishId', (req, res, send) => {
  // you don't create a new dishId, but rather MODIFY it. POST is invalid.
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/' + req.params.dishId);
})

// Equivalent of updating a dish with dishId
app.put('/dishes/:dishId', (req, res, send) => {
  res.write('Updating the dish: ' + req.params.dishId);
  res.end('\nWill update the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

app.delete('/dishes/:dishId', (req, res, send) => {
  res.end("Deleting dish with dishId: " + req.params.dishId);
})

// setting up html files from public folder
// express.static tells express to set up static files from __dirname/public
// **note: by default, webpages serve index.html
app.use(express.static(__dirname + "/public"));

// next is an additional middleware. it is also optional. req and res is similar to normal node req/res
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  // defaults to this, if the static file does NOT exist, because we did not handle it.
  res.end("<html><body><h1>This is an express server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`Express server started on: http://${HOST}:${PORT}`);
});
