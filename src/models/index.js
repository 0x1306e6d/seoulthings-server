const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/seoulthings',
    {
        dialect: 'postgres',
        timezone: '+09:00',
        operatorsAliases: false,
    }
);

const Location = sequelize.import(path.join(__dirname, 'location.js'));
const Remind = sequelize.import(path.join(__dirname, 'remind.js'));
const Thing = sequelize.import(path.join(__dirname, 'thing.js'));

Thing.belongsTo(Location, { as: 'location', foreignKey: 'locationId', targetKey: 'id' });

module.exports = {
    sequelize,
    Sequelize,
    Location,
    Remind,
    Thing,
};