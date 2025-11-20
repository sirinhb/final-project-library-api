import 
{ 
    createAuthor, 
    findAllAuthors, 
    findAuthorById,
    findAuthorByIdWithBooks,
    updateAuthorById, 
    deleteAuthorById 
} from '../repositories/authorRepo.js';

export async function createAuthorService(authorData) {
    const authors = await findAllAuthors();
    const duplicate = authors.find(
        author => 
            author.firstName.toLowerCase() === authorData.firstName.toLowerCase() && 
            author.lastName.toLowerCase() === authorData.lastName.toLowerCase()
    );
  
    if (duplicate) {
        const error = new Error('Author with this name already exists');
        error.status = 409; 
        throw error;
    }
    
    return await createAuthor(authorData);
}

export async function getAllAuthorsService() {
    return await findAllAuthors();
}

export async function getAuthorByIdService(id) {
    return await findAuthorById(id);
}

export async function getAuthorBooksByIdService(id) {
    const author = await findAuthorByIdWithBooks(id);

    if(!author) { 
        const error = new Error('Author not found');
        error.status = 404;
        throw error;
    }

    return author;
}

export async function updateAuthorService(id, authorData) {
    const author = await findAuthorById(id);
    if (!author) { 
        const error = new Error('Author not found');
        error.status = 404; 
        throw error;
    }

    return await updateAuthorById(id, authorData);
}

export async function deleteAuthorService(id) {
    const author = await findAuthorById(id);
    if (!author) {
        const error = new Error('Author not found');
        error.status = 404; 
        throw error;
    }

    return await deleteAuthorById(id);
}