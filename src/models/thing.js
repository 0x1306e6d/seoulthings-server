module.exports = (sequelize, DataTypes) => {
    const Thing = sequelize.define(
        'Thing',
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
            contents: {
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
            tableName: 'thing',
            schema: 'seoulthings',
        }
    )
    return Thing;
};