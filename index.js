const express = require('express');
const http = require("http");

const app = express();

const hostName = 'localhost';
const port = 3000;

app.use((req,res,next) => {
  console.log("req.headers",req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>Express is running</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostName, () => {
  console.log("express server listening");
})