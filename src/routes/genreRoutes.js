import express from 'express';
import * as genreController from '../controllers/genreController.js';
import { validateGenreQuery, validateGenreId, validateGenre } from '../middleware/genreValidators.js';

import authenticate from '../middleware/authenticate.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

const router = express.Router();

router.get('/', authenticate, authorizeRole('MANAGER', 'LIBRARIAN'), validateGenreQuery, genreController.getGenresHandler);
router.get('/:id', authenticate, authorizeRole('MANAGER', 'LIBRARIAN'), validateGenreId, genreController.getGenreByIdHandler);
router.get('/:id/books', authenticate, authorizeRole('MANAGER', 'LIBRARIAN'), validateGenreId, validateGenreQuery, genreController.getGenreBooksByIdHandler);

router.post('/', authenticate, authorizeRole('MANAGER'), validateGenre, genreController.createGenreHandler);

router.put('/:id', validateGenreId, authenticate, authorizeRole('MANAGER'), validateGenre, genreController.updateGenreHandler);

router.delete('/:id', validateGenreId, authenticate, authorizeRole('MANAGER'), genreController.deleteGenreHandler);

export default router;