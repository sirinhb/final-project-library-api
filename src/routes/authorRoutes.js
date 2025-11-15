import express from 'express';
import {
    createAuthor, 
    getAllAuthors, 
    getAuthorById, 
    getAuthorBooksById, 
    updateAuthor, 
    deleteAuthor 
} from '../controllers/authorController.js';

//import { validateAuthor, validateAuthorUpdate, validateAuthorId } from '../middleware/validateAuthor.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
import { validateAuthor, validateAuthorUpdate, validateAuthorId } from '../middleware/validateAuthor.js';

const router = express.Router();

// READ ALL - Authenticated users (token-based)
router.get('/', authenticate, getAllAuthors);

// READ ONE - Authenticated users (token-based)
router.get('/:id', authenticate, validateAuthorId, getAuthorById);

// GET Books by author - Authenticated users (token-based)
router.get('/:id/books', authenticate, validateAuthorId, getAuthorBooksById);

// CREATE - Manager only (role-based)
router.post('/', authenticate, authorizeRole('MANAGER'), validateAuthor, createAuthor);

// UPDATE - Manager only (role-based)
router.put('/:id', authenticate, authorizeRole('MANAGER'), validateAuthorUpdate, updateAuthor);

// DELETE - Manager only (role-based)
router.delete('/:id', authenticate, authorizeRole('MANAGER'), validateAuthorId, deleteAuthor);

export default router;