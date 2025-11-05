import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../config/db.js';


export const login = async (req, res) => {
    const { name, password } = req.body;
    console.log('Login attempt:', name);

    try {
        const employee = await prisma.employee.findFirst({ where: { name } });
        console.log('Employee found:', employee);

        if (!employee) return res.status(400).json({ message: 'Invalid credentials' });

        const validPassword = await bcrypt.compare(password, employee.password);
        console.log('Password valid:', validPassword);
        
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: employee.id, role: employee.role, name: employee.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error); // <-- important
        res.status(500).json({ message: 'Server error' });
    }
};
