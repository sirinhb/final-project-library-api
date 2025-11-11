import express from 'express';
import * as genreController from '../controllers/genreController.js';
import { validateGenreQuery, validateGenreId, validateGenre } from '../middleware/genreValidators.js'

// To Do:
//      Authorization
//      Documentation

const router = express.Router();

router.get('/', validateGenreQuery, genreController.getGenresHandler);
router.get('/:id', validateGenreId, genreController.getGenreByIdHandler);
router.get('/:id/books', validateGenreId, validateGenreQuery, genreController.getGenreBooksByIdHandler);

router.post('/', validateGenre, genreController.createGenreHandler);

router.put('/:id', validateGenreId, validateGenre, genreController.updateGenreHandler);

router.delete('/:id', validateGenreId, genreController.deleteGenreHandler);

export default router;