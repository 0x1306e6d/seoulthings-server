const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'resources')));

const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.on('error', (err) => {
    if (err.syscall !== 'listen') {
        throw err;
    }

    switch (err.code) {
        case 'EACCESS':
            console.error("Port %d requires elevated priviliges.", err.port);
            console.error(err);
            break;
        case 'EADDRINUSE':
            console.error("Port %s is already in use.", err.port);
            console.error(err);
            break;
        default:
            throw err;
    }
});
server.on('listening', () => {
    const address = server.address();
    console.log("Listening on %s:%d", address.address, address.port);
});
server.listen(port, hostname);