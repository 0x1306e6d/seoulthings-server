module.exports = (sequelize, DataTypes) => {
    const Remind = sequelize.define(
        'Remind',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            ownerId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            thingId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            due: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        {
            tableName: 'remind',
            schema: 'seoulthings',
        }
    );
    return Remind;
};