// src/services/employeeService.js
import bcrypt from 'bcrypt';
import * as employeeRepo from '../repositories/employeeRepo.js';

export async function getAllEmployees(filters) {
  return await employeeRepo.findEmployees(filters);
}

export async function getEmployee(id) {
  return await employeeRepo.findEmployeeById(id);
}

export async function getMyProfile(id) {
  return await employeeRepo.findEmployeeByIdIncludePassword(id);
}

export async function registerEmployee(data) {
  const existingEmployee = await employeeRepo.findEmployeeByName(data.name);
  
  if (existingEmployee) {
    const error = new Error('Employee with this name already exists');
    error.status = 409; 
    throw error;
  }
  
  data.password = await bcrypt.hash(data.password, 10);
  
  return await employeeRepo.createEmployee(data);
}

export async function updateEmployeeRole(id, updates) {
    const employee = await employeeRepo.findEmployeeById(id);

  if (!employee) {
    const error = new Error('Employee not found');
    error.status = 404;
    throw error;
  }

  const fieldsToUpdate = {};
  if (updates.role) fieldsToUpdate.role = updates.role;
  if (updates.name) fieldsToUpdate.name = updates.name;
  if (updates.password) fieldsToUpdate.password = updates.password;

  if (Object.keys(fieldsToUpdate).length === 0) {
    const error = new Error('You must update at least one of role, name, or password');
    error.status = 400;
    throw error;
  }

  return await employeeRepo.updateEmployee(id, fieldsToUpdate);
}

export async function updateMyProfile(id, data) {
  if (!data.name && !data.password) {
    const error = new Error('At least one field (name or password) must be provided');
    error.status = 400;
    throw error;
  }

    if (data.password) {
       data.password = await bcrypt.hash(data.password, 10);
    }

    return await employeeRepo.updateEmployee(id, data);
}

export async function removeEmployee(id) {
  const employee = await employeeRepo.findEmployeeById(id);

  if (!employee) {
    const error = new Error('Employee not found');
    error.status = 404;
    throw error;
  }

  return await employeeRepo.deleteEmployee(id);
}
