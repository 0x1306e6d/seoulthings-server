module.exports = (sequelize, DataTypes) => {
    const Things = sequelize.define(
        'Things',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            things: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            location: {
                type: DataTypes.UUID,
                allowNull: false,
            }
        },
        {
            timestamps: false,
            tableName: 'things',
            schema: 'seoulthings',
        }
    )
    return Things;
};