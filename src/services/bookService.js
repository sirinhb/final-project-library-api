import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/bookRepo.js';
import prisma from '../config/db.js';

export async function getAllBooks(filter) {
  return await getAll(filter);
}

export async function getBookById(id) {
  let result = await getById(id);
  if (result) return result;
  else {
    const error = new Error(`Cannot find book with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function createBook(data) {
  const { author, genre, ...bookData } = data;
  
  // Find or create author
  const [firstName, lastName] = author.split(' ');
  let authorRecord = await prisma.author.findFirst({
    where: { firstName, lastName }
  });
  if (!authorRecord) {
    authorRecord = await prisma.author.create({
      data: { firstName, lastName }
    });
  }
  
  // Find or create genre
  let genreRecord = await prisma.genre.findFirst({
    where: { name: genre }
  });
  if (!genreRecord) {
    genreRecord = await prisma.genre.create({
      data: { name: genre }
    });
  }
  
  // Check if book already exists
  const existingBook = await prisma.book.findFirst({
    where: {
      title: {contains: bookData.title, mode: 'insensitive'},
      authorId: authorRecord.id
    }
  });
  

  if (existingBook) {
    const error = new Error(`Book "${bookData.title}" by ${author} already exists. Use PUT /books/${existingBook.id} to update stock instead.`);
    error.status = 409;
    throw error;
  }
  
  const bookWithIds = {
    ...bookData,
    authorId: authorRecord.id,
    genreId: genreRecord.id
  };
  
  return await create(bookWithIds);
}

export async function updateBook(id, data) {
  const updatedBook = await update(id, data);
  if (updatedBook) return updatedBook;
  else {
    const error = new Error(`Cannot find book with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function deleteBook(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find book with id ${id}`);
    error.status = 404;
    throw error;
  }
}
