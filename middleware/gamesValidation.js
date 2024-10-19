const { body, validationResult } = require('express-validator');

const gameValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('developer').optional().isString(),
  body('publisher').optional().isString(),
  body('platform').optional().isString(),
  body('rating').optional().isString(),
  body('genre').optional().isString(),
  body('description').optional().isString(),
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  gameValidationRules,
  checkValidation
}