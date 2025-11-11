import * as genreRepository from '../repositories/genreRepository.js';

export async function getAllGenres(filter) {
  return genreRepository.getAll(filter);
}

export async function getGenreById(id) {
  let result = await genreRepository.getById(id);
  if (result) return result;
  else {
    const error = new Error(`Genre with id ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function getGenreBooksById(id) {
   let result = await genreRepository.getBooksById(id);
  if (result) return result;
  else {
    const error = new Error(`Genre with id ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createGenre(data) {
  return await genreRepository.create(data);
}

export async function updateGenre(id, data) {
  const updatedGenre = await genreRepository.update(id, data);
  if (updatedGenre) return updatedGenre;
  else {
    const error = new Error(`Cannot find genre with id ${id}`);
    error.status = 404;
    throw error;
  }
}

export async function deleteGenre(id) {
  const result = await genreRepository.remove(id);
  if (result) return;
  else {
    const error = new Error(`Cannot find post with id ${id}`);
    error.status = 404;
    throw error;
  }
}