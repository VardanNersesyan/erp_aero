const { UserRepository } = require('../repositories/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { app: APP_CONFIG } = require('../config');

exports.register = async (req, res, next) => {
    try {
        const { id, password } = req.body;

        const UserRep = new UserRepository();
        const isUserExists = await UserRep.isUserExists(id);

        if (isUserExists) {
            return res.status(409)
                .json({
                    success: false,
                    message: 'user already exist!'
                });
        }

        const user = await UserRep.createUser(id, password);

        if (!user) {
            return res.status(409)
                .json({
                    success: false,
                    message: 'Something went wrong, please try later!'
                });
        }

        const refreshToken = UserRep.genRefreshToken(user.id);
        const accessToken = UserRep.genAccessToken(user.id);
        await UserRep.storeRefreshToken(user.id, refreshToken);

        res.json({
            success: true,
            token: accessToken,
            refresh_token: refreshToken
        });
    } catch (err) {
        next(err);
    }
};

exports.signIn = async (req, res, next) => {
    try {
        const { id, password } = req.body;
        const UserRep = new UserRepository();
        const user = await UserRep.getById(id);
        const wrongCredentialsResp = {
            success: false,
            message: 'Wrong credentials'
        };

        if (!user) {
            return res.status(401).json(wrongCredentialsResp);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json(wrongCredentialsResp);
        }

        const refreshToken = UserRep.genRefreshToken(user.id);
        const accessToken = UserRep.genAccessToken(user.id);
        await UserRep.storeRefreshToken(user.id, refreshToken);

        res.json({
            success: true,
            token: accessToken,
            refresh_token: refreshToken
        });

    } catch (err) {
        next(err);
    }
};

exports.info = async (req, res, next) => {
    try {
        res.json({
            id: req.userId
        });

    } catch (err) {
        next(err);
    }
};

exports.logout = async (req, res, next) => {
    try {
        const UserRep = new UserRepository();
        await UserRep.clearRefreshToken(req.userId);

        res.json({
            success: true
        });
    } catch (err) {
        next(err);
    }
};

exports.refreshToken = async (req, res, next) => {
    try {
        const { token } = req.body;
        const UserRep = new UserRepository();

        const decodedToken = jwt.verify(token, APP_CONFIG.tokenRefreshSecret);
        if (!decodedToken) {
            return res.status(401)
                .json({
                    success: false,
                    message: "Unauthorized"
                });
        }

        const isTokenExists = await UserRep.isTokenExists(token);

        if (decodedToken.exp * 1000 < Date.now() || !isTokenExists) {
            return res.status(401)
                .json({
                    success: false,
                    message: "Unauthorized. Token expired."
                });
        }

        const accessToken = await UserRep.genAccessToken(decodedToken.id);
        return res.json({
            success: true,
            token: accessToken,
        });
    } catch (e) {
        next(e);
    }
};