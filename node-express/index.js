const express = require("express");
const http = require("http");
const morgan = require("morgan");

const HOST = "localhost";
const PORT = 3000;

// app will use express' module
const app = express();

// tells app to use morgan
app.use(morgan("dev"));

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
