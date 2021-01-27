module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.STRING,
            unique: true,
            length: 255,
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: type.TEXT,
            allowNull: false
        },
        token: {
            type: type.TEXT,
        },
        test: {
            type: type.TEXT,
        },
        refreshToken: {
            type: type.TEXT,
            field: 'refresh_token'
        },
        createdAt: {
            type: type.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: type.DATE,
            field: 'updated_at'
        }
    },{
        timestamps: true,
        underscored: true
    })
}