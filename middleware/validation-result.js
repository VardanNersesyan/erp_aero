const { validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array({ onlyFirstError: true }));
    }
    return next();
  } catch (error) {
    return next(error);
  }
};
