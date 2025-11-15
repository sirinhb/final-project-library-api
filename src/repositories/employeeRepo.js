import prisma  from '../config/db.js';

export async function findEmployees(filters) {
    return prisma.employee.findMany({where: filters, select: { id: true, name: true, role: true },
    });
}

export async function findEmployeeById(id) {
    return prisma.employee.findUnique({where: { id },select: { id: true, name: true, role: true },});
}

export async function findEmployeeByIdIncludePassword(id) {
    return prisma.employee.findUnique({ where: { id } });
}

export async function findEmployeeByName(name) {
    return prisma.employee.findFirst({ where: { name } });
}

export async function createEmployee(data) {
    return prisma.employee.create({ data });
}

export async function updateEmployee(id, data) {
    return prisma.employee.update({
        where: { id },
        data,
    });
}

export async function deleteEmployee(id) {
    return prisma.employee.delete({ where: { id } });
}

