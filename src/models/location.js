module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define(
        'Location',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            address: {
                type: DataTypes.TEXT,
            },
            contact: {
                type: DataTypes.TEXT,
            },
            latitude: {
                type: DataTypes.REAL,
            },
            longitude: {
                type: DataTypes.REAL,
            },
        },
        {
            timestamps: false,
            tableName: 'location',
            schema: 'seoulthings',
        }
    );
    return Location;
};