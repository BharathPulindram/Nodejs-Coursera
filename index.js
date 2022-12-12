const http = require("http");
const path = require("path");
const fs = require("fs");

const hostName = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log("req for " + req.url + " by method " + req.method);

  if (req.method === "GET") {
    var fileUrl;
    if (req.url === "/") {
      fileUrl = "/design.html";
    } else fileUrl = req.url;

    let filePath = path.resolve("./HTML" + fileUrl);
    console.log("filePath for " + filePath);
    const fileExt = path.extname(filePath);

    if (fileExt === ".html") {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            "<html><body><h1>File Not Found" + fileUrl + "</h1></body></html>"
          );
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        "<html><body><h1>File Not an HTML" + fileUrl + "</h1></body></html>"
      );
      return;
    }
  }else{
    res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            "<html><body><h1>File Format Not supported" + fileUrl + "</h1></body></html>"
          );
  }
});

server.listen(port, hostName, () => {
  console.log(`server listening at http://${hostName}:${port}`);
});
