import { body, param } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js'; 

export const validateAuthor = [
  body('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string')
    .isLength({ min: 2, max: 20 })
    .withMessage('First name must be between 2 and 20 characters'),
  
  body('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string')
    .isLength({ min: 2, max: 20 })
    .withMessage('Last name must be between 2 and 20 characters'),
  
  handleValidationErrors, 
];

export const validateAuthorUpdate = [
  body('firstName')
    .optional()
    .isString()
    .withMessage('First name must be a string')
    .isLength({ min: 2, max: 20 })
    .withMessage('First name must be between 2 and 20 characters'),
  
  body('lastName')
    .optional()
    .isString()
    .withMessage('Last name must be a string')
    .isLength({ min: 2, max: 20 })
    .withMessage('Last name must be between 2 and 20 characters'),
  
  handleValidationErrors,
];

export const validateAuthorId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive number'),
  
  handleValidationErrors, 
];