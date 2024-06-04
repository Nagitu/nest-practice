import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed data for Members
  const members = [
    {
      code: 'M001',
      name: 'Angga',
      warningDate: new Date('2023-01-01T00:00:00Z'),
    },
    {
      code: 'M002',
      name: 'Ferry',
      warningDate: new Date('2023-02-01T00:00:00Z'),
    },
    {
      code: 'M003',
      name: 'Putri',
      warningDate: new Date('2023-03-01T00:00:00Z'),
    },
  ];

  for (const member of members) {
    await prisma.member.upsert({
      where: { code: member.code },
      update: {},
      create: member,
    });
  }

  // Seed data for Books
  const books = [
    {
      code: 'JK-45',
      title: 'Harry Potter',
      author: 'J.K Rowling',
      stock: 1,
    },
    {
      code: 'SHR-1',
      title: 'A Study in Scarlet',
      author: 'Arthur Conan Doyle',
      stock: 1,
    },
    {
      code: 'TW-11',
      title: 'Twilight',
      author: 'Stephenie Meyer',
      stock: 1,
    },
    {
      code: 'HOB-83',
      title: 'The Hobbit, or There and Back Again',
      author: 'J.R.R. Tolkien',
      stock: 1,
    },
    {
      code: 'NRN-7',
      title: 'The Lion, the Witch and the Wardrobe',
      author: 'C.S. Lewis',
      stock: 1,
    },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { code: book.code },
      update: {},
      create: book,
    });
  }


  console.log('Database has been seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
