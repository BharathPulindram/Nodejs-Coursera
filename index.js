const http = require('http');

const hostName = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
    console.log("req",req.headers);
    console.log("response: " + res.req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('Bharath');

})

server.listen(port, hostName, () => {
console.log(`server listening at http://${hostName}:${port}`);
})