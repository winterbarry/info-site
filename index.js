// import modules
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const hostname = "localhost";
const port = 8080;

// create the server
const server = http.createServer((req, res) => {
  let filePath;

  // choose the HTML file based on the URL.
  if (req.url === "/") {
    filePath = "index.html";
  } else if (req.url === "/about") {
    filePath = "about.html";
  } else if (req.url === "/contact-me") {
    filePath = "contact-me.html";
  } else {
    // serve the 404 page for unknown URLs.
    filePath = "404.html";
    res.statusCode = 404;
  }

  // build full file path
  const fullPath = path.join(__dirname, filePath);

  // read html file
  fs.readFile(fullPath, "utf8", (err, data) => {
    // handle errors
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal Server Error");
      return;
    }

    // send html to browser
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  });
});

// start the server
server.listen(port, hostname, () => {
  console.log("Server running at http://${hostname}:${port}/");
});
