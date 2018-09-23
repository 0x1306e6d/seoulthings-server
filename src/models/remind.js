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
            owner: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            thing: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            due: {
                type: DataTypes.DATE,
                allowNull: false,
            }
        },
        {
            timestamps: false,
            tableName: 'remind',
            schema: 'seoulthings',
        }
    );
    return Remind;
};