import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../services/bookService.js';

export async function getAllBooksHandler(req, res) {
  const {
    search,
    sortBy = 'id',
    sortOrder = 'asc',
    limit = 10,
    offset = 0,
  } = req.query;

  const filter = {};
  if (search) filter.search = search;
  filter.sortBy = sortBy;
  filter.sortOrder = sortOrder;
  filter.limit = parseInt(limit);
  filter.offset = parseInt(offset);

  let result = await getAllBooks(filter);
  res.status(200).json(result);
}

export async function getBookByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let book = await getBookById(id);
  res.status(200).json(book);
}

export async function createBookHandler(req, res) {
  const data = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    price: req.body.price,
  };
  let newBook = await createBook(data);
  res.status(201).json(newBook);
}

export async function updateBookHandler(req, res) {
  let id = parseInt(req.params.id);
  const updates = {};
  if (req.body.stock) updates.stock = parseInt(req.body.stock);

  const updatedBook = await updateBook(id, updates);
  res.status(200).json(updatedBook);
}

export async function deleteBookHandler(req, res) {
  let id = parseInt(req.params.id);
  await deleteBook(id);
  res.status(204).send();
}
