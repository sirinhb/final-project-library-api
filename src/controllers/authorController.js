import {
    createAuthorService, 
    getAllAuthorsService, 
    getAuthorByIdService, 
    getAuthorBooksByIdService, 
    updateAuthorService, 
    deleteAuthorService
} from '../services/authorService.js'; 


// CREATE - POST /authors
export async function createAuthor(req, res) {
  try {
    const authorData = req.body;
    const newAuthor = await createAuthorService(authorData);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// READ ALL - GET /authors
export async function getAllAuthors(req, res) {
  try {
    const filter = {};
    
    if (req.query.name) {
      filter.name = req.query.name;
    }

    const authors = await getAllAuthorsService(filter);
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// READ ONE - GET /authors/:id
export async function getAuthorById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const author = await getAuthorByIdService(id);
    
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

//GET /authors/:id/books 
export async function getAuthorBooksById(req, res) {
    try{ 
        const id = parseInt(req.params.id);
        const author = await getAuthorBooksByIdService(id);
        res.json(author);
    } catch (error) { 
        if (error.status === 404) {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
}

// UPDATE - PUT /authors/:id
export async function updateAuthor(req, res) {
  try {
    const id = parseInt(req.params.id);
    const authorData = req.body;
    const updatedAuthor = await updateAuthorService(id, authorData);
    res.status(200).json(updatedAuthor);
  } catch (error) {

    if (error.status === 404) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

// DELETE - DELETE /authors/:id
export async function deleteAuthor(req, res) {
  try {
    const id = parseInt(req.params.id);
    await deleteAuthorService(id);
    res.status(204).send();
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}