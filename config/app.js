require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    tokenAccessSecret: process.env.SECRET_ACCESS_TOKEN,
    tokenRefreshSecret: process.env.SECRET_REFRESH_TOKEN,
    cookieSecret: process.env.COOKIE_SECRET,
    expRefreshToken: process.env.EXP_REFRESH_TOKEN,
    expAccessToken: process.env.EXP_ACCESS_TOKEN,
    environment: process.env.ENVIRONMENT || 'development',

};