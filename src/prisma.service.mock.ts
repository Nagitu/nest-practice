import { PrismaService } from './prisma.service';

export const mockPrismaService = {
  book: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  member: {
    findUnique: jest.fn(),
  },
  borrow: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
};
