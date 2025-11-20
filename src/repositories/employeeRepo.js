import prisma  from '../config/db.js';

export async function findEmployees(filters) {
    return await prisma.employee.findMany({where: filters, select: { id: true, name: true, role: true },
    });
}

export async function findEmployeeById(id) {
    return await prisma.employee.findUnique({where: { id },select: { id: true, name: true, role: true },});
}

export async function findEmployeeByIdIncludePassword(id) {
    return await prisma.employee.findUnique({ where: { id } });
}

export async function findEmployeeByName(name) {
    return await prisma.employee.findFirst({ where: { name } });
}

export async function createEmployee(data) {
    return await prisma.employee.create({ data });
}

export async function updateEmployee(id, data) {
    return await prisma.employee.update({
        where: { id },
        data,
    });
}

export async function deleteEmployee(id) {
    return prisma.employee.delete({ where: { id } });
}

