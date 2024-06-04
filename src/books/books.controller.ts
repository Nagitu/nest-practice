import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Borrow } from '@prisma/client';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get('/available')
  findAvailable(){
    return this.booksService.findAvailable()
  }

  @Post(':bookCode/borrow')
  async borrowBook(
    @Param('bookCode') bookCode: string,
    @Body('memberCode') memberCode: string,
    data :{bookCode ,memberCode}
  ) {
    if (!bookCode || !memberCode) {
      throw new HttpException('Book code and member code are required', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.booksService.createBorrow(bookCode, memberCode);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    return 
    this.booksService.createBorrow(bookCode, memberCode)
    
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.booksService.findOne(code);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.booksService.remove(code);
  }
}
