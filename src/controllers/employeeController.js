import * as employeeService from '../services/employeeService.js';
export async function listEmployees(req, res) {
  const filters = req.query; // filter by name, role
  const employees = await employeeService.getAllEmployees(filters);
  res.json(employees);
}

export async function getEmployee(req, res) {
  const employee = await employeeService.getEmployee(parseInt(req.params.id));
  if (!employee) return res.status(404).json({ message: 'Employee not found' });
  res.json(employee);
}

export async function getMyProfile(req, res) {
  const profile = await employeeService.getMyProfile(req.user.id);
  res.json(profile);
}

export async function registerEmployee(req, res) {
  const employee = await employeeService.registerEmployee(req.body);
  res.status(201).json(employee);
}

export async function updateEmployeeRole(req, res) {
  const employee = await employeeService.updateEmployeeRole(
    parseInt(req.params.id),
    req.body.role
  );
  res.json(employee);
}

export async function updateMyProfile(req, res) {
  const employee = await employeeService.updateMyProfile(req.user.id, req.body);
  res.json(employee);
}

export async function deleteEmployee(req, res) {
  await employeeService.removeEmployee(parseInt(req.params.id));
  res.status(204).send();
}