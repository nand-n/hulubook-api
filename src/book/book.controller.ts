import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("books")
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post()
  @UseInterceptors(FilesInterceptor("files"))
  create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    try {
      return this.bookService.create(createBookDto, files);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(":userId/purchase/:bookId")
  async purchaseBook(
    @Param("userId") userId: string,
    @Param("bookId") bookId: string,
  ) {
    return await this.bookService.purchaseBook(userId, bookId);
  }
  @Get("/purchsed-books-by-user/:id")
  getPurchasedBooks(@Param("id") userId: string) {
    {
      /**Intended fetch purchsed books by id */
    }
    return this.bookService.getPurchasedBooks(userId);
  }

  @Get(":id")
  findAll(@Param("id") userId: string) {
    return this.bookService.findAll(userId);
  }

  @Get("single/:userId/:bookId")
  findOne(@Param("userId") userId: string, @Param("bookId") bookId: string) {
    return this.bookService.findOne(userId, bookId);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookService.remove(id);
  }
}
