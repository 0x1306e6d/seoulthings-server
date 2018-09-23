const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: 'seoulthings',
    dialect: 'postgres',
    timezone: '+09:00',
    operatorsAliases: false,
});

module.exports = {
    sequelize,
    Sequelize,
    Location: sequelize.import(path.join(__dirname, 'location.js')),
    Remind: sequelize.import(path.join(__dirname, 'remind.js')),
    Things: sequelize.import(path.join(__dirname, 'things.js')),
};