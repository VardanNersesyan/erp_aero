const jwt = require('jsonwebtoken');
const { app: APP_CONFIG } = require('../config');

module.exports = async (req, res, next) => {
  try {
    let token = req.get('Authorization');
    if (!token) {
      return res.status(401).json({
        message: 'Not authenticated.',
      });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    const decodedToken = jwt.verify(token, APP_CONFIG.tokenAccessSecret);
    if (!decodedToken) {
      return res.status(401)
          .json({
            success: false,
            message: "Unauthorized"
          });
    }


    if (decodedToken.exp * 1000 < Date.now()) {
      return res.status(401)
        .json({
          success: false,
          message: "Unauthorized. Token expired."
        });
    }


    req.userId = decodedToken.id;

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Token expired."
    });
  }
};
