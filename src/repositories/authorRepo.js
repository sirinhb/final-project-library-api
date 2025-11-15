import prisma from '../config/db.js';

// create a new author (post)
export async function createAuthor(authorData) { 
    return await prisma.author.create({
        data: authorData
    });
}

//get all authors (get)
export async function findAllAuthors(filter = {}) {
    const where = {};

    if (filter.name) {
        where.OR = [
            { firstName: { contains: filter.name, mode: 'insensitive' } },
            { lastName: { contains: filter.name, mode: 'insensitive' } }
        ];
    }

    
    return await prisma.author.findMany({
        where 
    });
    
}

//get author by id (get/id)
export async function findAuthorById(id) { 
    return await prisma.author.findUnique({
        where: { id: parseInt(id) }
    });
}

//get author books by id (get/id/books) 
export async function findAuthorByIdWithBooks(id) {
    const author = await prisma.author.findUnique({
        where: { id: parseInt(id) },
        include: {
            books: true
        }
    });
    
    return author ? author.books : null;
}

//update author by id  (put/id)
export async function updateAuthorById(id, authorData){ 
    return await prisma.author.update({
        where: { id: parseInt(id) }, 
        data: authorData
    });
}

//delete author by id (delete/id)
export async function deleteAuthorById(id) { 
    return await prisma.author.delete({ 
        where: { id: parseInt(id) }
    });
}