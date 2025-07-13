const { body, param, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

// User validation rules
const validateUser = [
  body('username')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Username must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  
  body('age')
    .isInt({ min: 1, max: 120 })
    .withMessage('Age must be between 1 and 120'),
  
  body('sex')
    .isIn(['male', 'female'])
    .withMessage('Sex must be either male or female'),
  
  body('feedback')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Feedback cannot exceed 500 characters'),
  
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('drivingDuration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Driving duration must be a positive number'),
  
  validate
];

// Update user validation (all fields optional)
const validateUserUpdate = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Username must be between 2 and 50 characters'),
  
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  
  body('age')
    .optional()
    .isInt({ min: 1, max: 120 })
    .withMessage('Age must be between 1 and 120'),
  
  body('sex')
    .optional()
    .isIn(['male', 'female'])
    .withMessage('Sex must be either male or female'),
  
  body('feedback')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Feedback cannot exceed 500 characters'),
  
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('drivingDuration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Driving duration must be a positive number'),
  
  validate
];

// ID validation
const validateId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  
  validate
];

module.exports = {
  validateUser,
  validateUserUpdate,
  validateId
}; 