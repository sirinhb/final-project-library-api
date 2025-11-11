import { prisma } from '../config/db.js';

export async function getAll(filter) {
  return prisma.genre.findMany({
    orderBy: { [filter.sortBy]: filter.sortOrder },
    take: filter.limit,
    skip: filter.offset
  });
}

export async function getById(id) {
  return prisma.genre.findUnique({where: { id }});
}

export async function getBooksById(id) {
  return prisma.genre.findUnique({where: { id }, select: { books: { include: {genreId: false} } } });
}

export async function create(genre) {
    const newGenre = await prisma.genre.create({
        data: genre,
      });
      return newGenre;
}

export async function update(id, updates) {
  try {
    const updatedGenre = await prisma.genre.update({
      where: { id },
      data: updates,
    });
    return updatedGenre;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedGenre = await prisma.genre.delete({
      where: { id },
    });
    return deletedGenre;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function nameExists(name) {
  const result = await prisma.genre.findFirst({where: {name}});
  return result;
}