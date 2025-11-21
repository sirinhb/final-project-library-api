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
  try {
    const { name, password, role } = req.body;
    
    console.log('Register new employee:', { name, role });

    const employee = await employeeService.registerEmployee({
      name,
      password,
      role,
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error('Register employee error:', error);
    
    if (error.status === 409) {
      return res.status(409).json({ error: error.message });
    }

    if (error.code === 'P2002') {
      return res.status(409).json({ 
        error: 'Employee with this name already exists' 
      });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateEmployeeRole(req, res) {
  try {
    const id = parseInt(req.params.id);
    let { role } = req.body;

    if(role) {
      role = role.toUpperCase();
    }

  const employee = await employeeService.updateEmployeeRole(id, role);

  res.json(employee);
  } catch (error) {
    console.error('Update employee error:', error);

    if (error.status === 400) {
      return res.status(400).json({ error: error.message });
    }

    if (error.status === 404) {
      return res.status(404).json({error: error.message});
    }

    res.status(500).json({error: 'Internal Server Error'});
  }
}

export async function updateMyProfile(req, res) {
  try {
    const { name, password } = req.body;

    console.log('Update profile for user ID:', req.user.id);
    console.log('Updated data:', req.body);

    const employee = await employeeService.updateMyProfile(req.user.id, { name, password });

    res.json(employee);

  } catch (error) {
    console.error('Update profile error:', error);

    if (error.status === 400) { 
      return res.status(400).json({ error: error.message });
    }

    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Employee with this name already exists' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteEmployee(req, res) {
  try {
    const id = parseInt(req.params.id);

    console.log('Delete employee ID:', id);

    if (req.user.id === id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    await employeeService.removeEmployee(id);

    res.status(204).send();

  } catch (error) {
    console.error('Delete employee error:', error);

    if (error.status === 404) {
      return res.status(404).json({ error: error.message });
    }

    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Cannot delete employee with related data' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
}