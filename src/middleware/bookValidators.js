import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateBookId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Book id must be a positive integer'),
  handleValidationErrors,
];

const allowedSortFields = ['id', 'author', 'title', 'genre'];
const allowedSortOrders = ['asc', 'desc'];
export const validateBookQuery = [
  query('search').optional().isString().withMessage('search must be a string'),

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

export const validateCreateBook = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('title is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('title must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('title must be at least 3 characters'),

  body('author')
    .exists({ values: 'falsy' })
    .withMessage('author is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('author must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('author must be at least 5 characters'),
    
    body('genre')
    .exists({ values: 'falsy' })
    .withMessage('genre is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('genre must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('genre must be at least 5 characters'),

    body('price')
    .exists({ values: 'falsy' })
    .withMessage('price is required')
    .bail()
    .isFloat({min: 0.01})
    .withMessage('price must be a positive number'),

  handleValidationErrors,
];

export const validateUpdateBook = [
  oneOf(
    [
      body('stock').exists({ values: 'falsy' }),
    ],
    {
      message:
        'Stock must be provided',
    },
  ),

 body('stock')
    .exists({ values: 'falsy' })
    .withMessage('stock is required')
    .bail()
    .trim()
    .escape()
    .isInt({min: 1})
    .withMessage('stock must be a positive integer'),

  handleValidationErrors,
];
