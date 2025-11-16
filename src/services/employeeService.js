// src/services/employeeService.js
import bcrypt from 'bcrypt';
import * as employeeRepo from '../repositories/employeeRepo.js';

export async function getAllEmployees(filters) {
  return employeeRepo.findEmployees(filters);
}

export async function getEmployee(id) {
  return employeeRepo.findEmployeeById(id);
}

export async function getMyProfile(id) {
  return employeeRepo.findEmployeeByIdIncludePassword(id);
}

export async function registerEmployee(data) {
  data.password = await bcrypt.hash(data.password, 10);
  return employeeRepo.createEmployee(data);
}

export async function updateEmployeeRole(id, role) {
  return employeeRepo.updateEmployee(id, { role });
}

export async function updateMyProfile(id, data) {
  if (data.password) data.password = await bcrypt.hash(data.password, 10);
  return employeeRepo.updateEmployee(id, data);
}

export async function removeEmployee(id) {
  return employeeRepo.deleteEmployee(id);
}
