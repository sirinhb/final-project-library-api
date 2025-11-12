import prisma from '../config/db.js';

export async function getAll(filter) {
  const conditions = {};

  if (filter.search) {
    conditions.OR = [
      { title: { contains: filter.search, mode: 'insensitive' } },
      { author: { 
          OR: [
            { firstName: { contains: filter.search, mode: 'insensitive' } },
            { lastName: { contains: filter.search, mode: 'insensitive' } }
          ]
        }
      },
      { genre: { name: { contains: filter.search, mode: 'insensitive' } } },
    ];
  }

  const books = await prisma.book.findMany({
    where: conditions,
    select: {
      id: true,
      title: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      genre: {
        select: {
          name: true,
        },
      },
      price: true,
      stock: true,
    },
    orderBy: filter.sortBy === 'author' 
      ? { author: { firstName: filter.sortOrder } }
      : filter.sortBy === 'genre'
      ? { genre: { name: filter.sortOrder } }
      : { [filter.sortBy]: filter.sortOrder },
    take: filter.limit,
    skip: filter.offset,
  });

  return books.map(book => ({
    ...book,
    author: `${book.author.firstName} ${book.author.lastName}`,
    genre: book.genre.name,
  }));
}

export async function getById(id) {
  const book = await prisma.book.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      genre: {
        select: {
          name: true,
        },
      },
      price: true,
      stock: true,
    },
  });

  if (!book) return null;

  return {
    ...book,
    author: `${book.author.firstName} ${book.author.lastName}`,
    genre: book.genre.name,
  };
}

export async function create(book) {
  const newBook = await prisma.book.create({
    data: {...book, stock: 1},
  });
  return newBook;
}

export async function update(id, updates) {
  try {
    const updatedBook = await prisma.book.update({
      where: { id },
      data: updates,
    });
    return updatedBook;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedBook = await prisma.book.delete({
      where: { id },
    });
    return deletedBook;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
