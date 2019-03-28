const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');

const controllers = require('./controllers');
const models = require('./models');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'resources')));
app.use(controllers);

try {
    const serviceAccount = require('./../firebase-adminsdk.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://seoulthings.firebaseio.com',
    });
} catch (error) {
    console.error('Failed to load service account credentials.');
    console.error('Load service account credentials from environment variables.');
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        databaseURL: 'https://seoulthings.firebaseio.com',
    });
}

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

models.sequelize.authenticate()
    .then(() => {
        console.log('Authenticated with Sequelize.');

        server.listen(port, hostname);
    })
    .catch((err) => {
        console.error('Failed to authenticate with Sequelize.');
        console.error(err);
    });