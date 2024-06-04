import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma.service';
import { Borrow, Prisma } from '@prisma/client';


@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll() {
    return this.prisma.book.findMany();
  }
  findAvailable(){
    return this.prisma.book.findMany({
      where: {
        stock: {
          gt: 0, 
        },
      },
    });  }

  findOne(code : string) {
    return this.prisma.book.findUnique({
      where:{
        code
      }
    })
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(code : string) {
    return this.prisma.book.delete({
      where: {
        code
      }
    })
  }

  async createBorrow(bookCode: string,memberCode: string){
    await this.prisma.$transaction(async (prisma) => {
      await prisma.borrow.create({
        data: {
          bookCode: bookCode,
          memberCode: memberCode,
          borrowedAt: new Date()
        },
      });
      await prisma.book.update({
        where: { code: bookCode },
        data: { stock: { decrement: 1 } }
      });
    });

    return { message: "Borrow entry created and book stock updated successfully" };
  }
  }

