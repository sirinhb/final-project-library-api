import express from 'express';
import * as genreController from '../controllers/genreController.js';

// To Do:
//      Validation
//      Authorization
//      Documentation

const router = express.Router();

router.get('/', genreController.getGenresHandler);
router.get('/:id', genreController.getGenreByIdHandler);
router.get('/:id/books', genreController.getGenreBooksByIdHandler);

router.post('/', genreController.createGenreHandler);

router.put('/:id', genreController.updateGenreHandler);

router.delete('/:id', genreController.deleteGenreHandler);

export default router;