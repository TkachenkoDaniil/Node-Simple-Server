
const http = require('http');

const app = require('./app');

const port = process.env.API_PORT;
app.set(port);

const server = http.createServer(app);
server.listen(port);
