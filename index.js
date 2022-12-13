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


app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  next();
})

app.get('/dishes', (req, res, next) => {
  res.end('Dishes data is available');
});

app.post('/dishes', (req, res, next) => {
  res.end(`Dishes name: ${req.body.name} with details: ${req.body.details}`);
});

app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end("Put Operation is not supported");
});

app.delete('/dishes', (req, res, next) => {
  res.end("Deleted Operation");
});

app.use((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>Express is running</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostName, () => {
  console.log("express server listening");
})