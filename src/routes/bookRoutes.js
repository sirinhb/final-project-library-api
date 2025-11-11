import express from 'express';
import {
  validateBookId,
  validateBookQuery,
  validateCreateBook,
  validateUpdateBook,
} from '../middleware/bookValidators.js';

import { authenticate } from '../middleware/authenticate.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

import {
  getAllBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from '../controllers/bookController.js';

const router = express.Router();

router.get('/', authenticate, authorizeRole('MANAGER', 'LIBRARIAN'), validateBookQuery, getAllBooksHandler);

router.get('/:id', validateBookId, authenticate, authorizeRole('MANAGER', 'LIBRARIAN'), getBookByIdHandler);

router.post('/', authenticate, authorizeRole('MANAGER'), validateCreateBook, createBookHandler);

router.put('/:id', validateBookId, authenticate, authorizeRole('MANAGER'), validateUpdateBook, updateBookHandler);

router.delete('/:id', validateBookId, authenticate, authorizeRole('MANAGER'), deleteBookHandler);

export default router;
