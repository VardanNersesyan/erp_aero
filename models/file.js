module.exports = (sequelize, type) => {
    return sequelize.define('file', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.TEXT
        },
        extension: {
            type: type.TEXT
        },
        mimeType: {
            type: type.TEXT,
            field: 'mime_type'
        },
        size: {
            type: type.BIGINT,
            unsigned: true,
        },
        path: {
            type: type.TEXT
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
    });
}