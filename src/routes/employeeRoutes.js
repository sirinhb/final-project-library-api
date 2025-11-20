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
import { validateEmployeeUpdate, validateEmployeeRegistration, validateMyProfileUpdate } from '../middleware/validateEmployee.js';

const router = express.Router();
// Authenticated endpoints
router.get('/me', authenticate, getMyProfile);
router.put('/me', authenticate, validateMyProfileUpdate, updateMyProfile);

// Manager endpoints
router.get('/', authenticate, authorizeRole('MANAGER'), listEmployees);
router.get('/:id', authenticate, authorizeRole('MANAGER'), getEmployee);
router.post('/register', authenticate, authorizeRole('MANAGER'), validateEmployeeRegistration, registerEmployee);
router.put('/:id', authenticate, authorizeRole('MANAGER'), validateEmployeeUpdate, updateEmployeeRole);
router.delete('/:id', authenticate, authorizeRole('MANAGER'), deleteEmployee);

export default router;