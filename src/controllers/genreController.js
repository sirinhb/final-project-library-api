import * as genreService from '../services/genreService.js';

export async function getGenresHandler(req, res, next) {
  const {
    sortBy = 'id',
    sortOrder = 'asc',
    limit = 10,
    offset = 0,
  } = req.query;

  const filter = {};
  filter.sortBy = sortBy;
  filter.sortOrder = sortOrder;
  filter.limit = parseInt(limit);
  filter.offset = parseInt(offset);

  const genres = await genreService.getAllGenres(filter);
  res.json(genres);
}

export async function getGenreByIdHandler(req, res, next) {
  const id = parseInt(req.params.id);
  const genre = await genreService.getGenreById(id);
  res.json(genre);
}

export async function getGenreBooksByIdHandler(req, res, next) {
  const id = parseInt(req.params.id);
  const genre = await genreService.getGenreBooksById(id);
  res.json(genre);
}

export async function createGenreHandler(req, res) {
  const data = {
    name: req.body.name,
  };
  let newGenre = await genreService.createGenre(data);
  res.status(201).json(newGenre);
}

export async function updateGenreHandler(req, res) {
  let id = parseInt(req.params.id);
  const updates = {};
  if (req.body.name) updates.name = req.body.name;

  const updatedGenre = await genreService.updateGenre(id, updates);
  res.status(200).json(updatedGenre);
}

export async function deleteGenreHandler(req, res) {
  let id = parseInt(req.params.id);
  await genreService.deleteGenre(id);
  res.status(204).send();
}