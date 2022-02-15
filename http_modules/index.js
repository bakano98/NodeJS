// Whichever
const http = require("http");
const fs = require("fs");
const path = require("path");

const HOST = "localhost";
const PORT = 3000;

// set up server. req is incoming http req to server, whereas res is what is returned to client upon a request
const server = http.createServer((req, res) => {
  console.log("URL: " + req.url + " method: " + req.method);
  if (req.method == "GET") {
    var fileUrl;
    if (req.url == "/") {
      fileUrl = "/index.html";
    } else {
      fileUrl = req.url;
    }

    // finding filepath
    var filePath = path.resolve("./public" + fileUrl);

    // check if it's a html file
    const fileExt = path.extname(filePath);
    if (fileExt == ".html") {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          // send statusCode error if file does not exist
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end("<html><body><h1>file not found</h1></body></html>");

          return;
        }
        // it exists!
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end("<html><body><h1>file is not a HTML file</h1></body></html>");

      return;
    }
  } else {
    // request method not GET
    // then just ignore first.
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body><h1>request method not supported</h1></body></html>");

    return;
  }
});

// start the server on port: PORT and name: HOST
server.listen(PORT, HOST, () => {
  console.log(`Server running at: http://${HOST}:${PORT}`);
});
