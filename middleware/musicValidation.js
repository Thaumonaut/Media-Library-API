const { body, validationResult } = require('express-validator');

const validationRules = [
    body('artist')
    .notEmpty().withMessage('Artist name is required')
    .isLength({ min: 3 }).withMessage('Please, add a valid Artist name'),

body('album')
    .notEmpty().withMessage('Album name is required')
    .isString()
    .isLength({ min: 3 }).withMessage('Please, add an album name with at least 3 characters long'),

body('song')
    .optional()
    .isLength({ min: 10 }).withMessage('Song name must be at least 10 characters long'),

body('genre')
    .notEmpty().withMessage('Genre is required')
    .isLength({ min: 5 }).withMessage('Please , add a valid genre'),


body('explicit')
    .optional()
    .isBoolean()
    .withMessage("Please, enter true or false"),
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
    validationRules,
  checkValidation
};