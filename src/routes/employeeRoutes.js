import express from 'express';
import {
  listEmployees,
  getEmployee,
  getMyProfile,
  registerEmployee,
  updateEmployeeRole,
  updateMyProfile,
  deleteEmployee
} from '../controllers/employeeController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

const router = express.Router();

// Manager endpoints
router.get('/', authenticate, authorizeRole('MANAGER'), listEmployees);
router.get('/:id', authenticate, authorizeRole('MANAGER'), getEmployee);
router.post('/register', authenticate, authorizeRole('MANAGER'), registerEmployee);
router.put('/:id', authenticate, authorizeRole('MANAGER'), updateEmployeeRole);
router.delete('/:id', authenticate, authorizeRole('MANAGER'), deleteEmployee);

// Authenticated endpoints
router.get('/me', authenticate, getMyProfile);
router.put('/me', authenticate, updateMyProfile);

export default router;