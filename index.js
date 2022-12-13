const express = require('express');
const http = require("http");
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const hostName = 'localhost';
const port = 3000;

app.use(express.static(__dirname+'/HTML'))

app.use((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>Express is running</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostName, () => {
  console.log("express server listening");
})