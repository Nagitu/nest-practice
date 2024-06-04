import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma.service';
import { Book, Borrow, Prisma } from '@prisma/client';


@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prisma.book.create({
      data 
    })
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

  update(bookCode: string, data: Prisma.BookUpdateInput): Promise<Book>  {
    return this.prisma.book.update({
      where: { code: bookCode },
      data,
    });
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

