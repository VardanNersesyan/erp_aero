const Sequelize = require('sequelize')
const UserModel = require('./models/user');
const FileModel = require('./models/file');
const { db: DB_CONFIG } = require('./config');

const sequelize = new Sequelize(
    DB_CONFIG.connection.database,
    DB_CONFIG.connection.user, DB_CONFIG.connection.password, {
    host: DB_CONFIG.connection.host,
    dialect: 'mysql',
    port: DB_CONFIG.connection.port,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const User = UserModel(sequelize, Sequelize)
const File = FileModel(sequelize, Sequelize)
File.belongsTo(User);

sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created!`)
    })

module.exports = {
    User,
    File,
}