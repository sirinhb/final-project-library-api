import bcrypt from 'bcrypt';
import prisma  from '../src/config/db.js';

try {
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.author.deleteMany();
  await prisma.employee.deleteMany();
  

  const employeesData = [
    {
      role: 'LIBRARIAN',
      name: 'Mark Ruffalo',
      password: await bcrypt.hash('mark1234', 10),
    },
    {
      role: 'LIBRARIAN',
      name: 'Bella Hadid',
      password: await bcrypt.hash('bella1234', 10),
    },
    {
      role: 'MANAGER',
      name: 'Steve Jobs',
      password: await bcrypt.hash('steve1234', 10),
    },
  ];

  const employees = await Promise.all(
    employeesData.map((employee) => prisma.employee.create({ data: employee })),
  );

    const authorsData = [
    {
      firstName: 'Hafsah',
      lastName: 'Faizal',
    },
    {
      firstName: 'Hannah',
      lastName: 'Grace',
    },
    {
      firstName: 'Alex',
      lastName: 'Michaelides',
    },
  ];

  const authors = await Promise.all(
    authorsData.map((author) => prisma.author.create({ data: author })),
  );

   const genresData = [
    {
      name: 'Fantasy',
    },
    {
      name: 'Romance',
    },
    {
      name: 'Mystery',
    },
  ];

  const genres = await Promise.all(
    genresData.map((genre) => prisma.genre.create({ data: genre })),
  );

  const booksData = [
    {
      title: 'We Hunt the Flame',
      authorId: authors[0].id,
      genreId: genres[0].id,
      price: 20.00,
      stock: 2
    },
    {
      title: 'Icebreaker',
      authorId: authors[1].id,
      genreId: genres[1].id,
      price: 15.00,
      stock: 4
    },
    {
      title: 'The Silent Patient',
      authorId: authors[2].id,
      genreId: genres[2].id,
      price: 10.00,
      stock: 6
    },
  ];

  const books = await Promise.all(
    booksData.map((book) => prisma.book.create({ data: book })),
  );

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}
