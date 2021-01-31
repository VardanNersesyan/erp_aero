const { User } = require('../sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { app: APP_CONFIG } = require('../config');
const { BaseRepository } = require('./base-repository');

module.exports.UserRepository = class UserRepository extends BaseRepository {

    MODEL = User;

    isUserExists = async (id) => {
        const count = await this.MODEL.count({
            where: {
                id
            }
        });

        return !!count;
    }

    createUser = async (id, password) => {
        const response = await this.MODEL.create({
            id,
            password: await bcrypt.hash(password, 8)
        });

        if (!response) {
            return null;
        }

        return (({ id }) => ({ id }))(response.dataValues);
    }

    storeRefreshToken = async (userId, refreshToken) => {
        const response = await this.MODEL.update(
            {
                refreshToken: refreshToken
            },
            {
                where: {
                    id: userId
                }
            }
        );

        return !!response[0];
    }

    genRefreshToken = (userId) => {
        return jwt.sign(
            { id: userId.toString() },
            APP_CONFIG.tokenRefreshSecret,
            { expiresIn: APP_CONFIG.expRefreshToken },
        );
    };

    genAccessToken = (userId) => {
        return jwt.sign(
            { id: userId.toString() },
            APP_CONFIG.tokenAccessSecret,
            { expiresIn: APP_CONFIG.expAccessToken },
        );
    };

    clearRefreshToken = async (userId) => {
        const response = await this.MODEL.update(
            {
                refreshToken: null
            },
            {
                where: {
                    id: userId
                }
            }
        );

        return !!response[0];
    }

    isTokenExists = async (token) => {
        const count = await this.MODEL.count({
            where: {
                refreshToken: token
            }
        });

        return !!count;
    }
}