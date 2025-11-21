import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateEmployeeRegistration = [
  body('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 2, max: 20 })
    .withMessage('Name must be between 2 and 20 characters'),
  
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  
  body('role')
    .exists({ checkFalsy: true })
    .withMessage('Role is required')
    .isString()
    .withMessage('Role must be a string')
    .isIn(['LIBRARIAN', 'MANAGER'])
    .withMessage('Role must be either LIBRARIAN or MANAGER'),
  
  handleValidationErrors,
];

export const validateEmployeeUpdate = [
  body('role')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Role must be a string')
    .trim()
    .customSanitizer(value => value.toUpperCase())
    .isIn(['LIBRARIAN', 'MANAGER'])
    .withMessage('Role must be either LIBRARIAN or MANAGER'),

   body('name')
    .optional({ checkFalsy: true })
    .isString()
    .withMessage('Name must be a string')
    .trim(),


  body().custom(value => {
    if (!value.role && !value.name) {
      throw new Error('You must update at least one of role, or name');
    }
    return true;
  }),
  
  handleValidationErrors,
];


export const validateMyProfileUpdate = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('password')
    .optional()
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  
  // At least one field must be present
  body()
    .custom((value, { req }) => {
      if (!req.body.name && !req.body.password) {
        throw new Error('At least one field (name or password) must be provided');
      }
      return true;
    }),
  
  handleValidationErrors,
];


