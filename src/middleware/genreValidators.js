import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { nameExists } from '../repositories/genreRepository.js';

const allowedSortFields = ['id','name'];
const allowedSortOrders = ['asc', 'desc'];
export const validateGenreQuery = [
  query('sortBy')
    .optional()
    .isIn(allowedSortFields)
    .withMessage(`sortBy must be one of: ${allowedSortFields.join(', ')}`),

  query('sortOrder')
    .optional()
    .isIn(allowedSortOrders)
    .withMessage(`sortOrder must be one of: ${allowedSortOrders.join(', ')}`),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit must be an integer between 1 and 100'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be 0 or a positive integer'),

  handleValidationErrors,
];

export const validateGenreId = [
    param('id')
    .isInt()
    .withMessage('ID must be a number'),

    handleValidationErrors,
];

export const validateGenre = [
    body('name')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Name is required')
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage('Name must be at least 3 and at most 100 characters')
        .bail()
        .custom(async(value) => {
        if(value && await nameExists(value)){
            throw new Error(`Name ${value} Alredy used!`);
        }
            return true;
        } ),

    handleValidationErrors,
];