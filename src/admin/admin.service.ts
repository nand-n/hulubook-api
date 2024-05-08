import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BookEntity } from "src/book/entities/book.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { Payment } from "src/payment/entities/payment.entity";
import { UpdateBookAdminDto } from "./dto/update-book-by-admin.dto";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return `This action adds a new admin ${createAdminDto}`;
  }

  async publishBook(bookId: string) {
    try {
      // const user = await this.userRepository.findOne({ where: { id: userId } });
      const book = await this.bookRepository.findOne({ where: { id: bookId } });
      if (!book) {
        throw new HttpException(
          `Book with a given id ${bookId} not found!`,
          HttpStatus.BAD_REQUEST,
        );
      }
      book.isAvailable = true;
      const updatedBook = await this.bookRepository.save(book);

      return updatedBook;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async findAll() {
    const books = await this.bookRepository.find();
    return books;
  }

  findOne(id: string) {
    return `This action returns a #${id} admin`;
  }

  async updateBook(id: string, updateAdminDto: UpdateBookAdminDto) {
    const book = await this.bookRepository.findOne({ where: { id } });
    book.title = updateAdminDto.title ?? book.title;
    book.price = updateAdminDto.price ?? book.price;
    book.isAvailable = updateAdminDto.isAvailable ?? book.isAvailable;
    book.grade = updateAdminDto.grade ?? book.grade;
    book.coverImageUrl = updateAdminDto.coverImageUrl ?? book.coverImageUrl;
    book.pdfUrl = updateAdminDto.pdfUrl ?? book.pdfUrl;

    const updatedBook = await this.bookRepository.save(book);

    return updatedBook;
  }

  remove(id: string) {
    return `This action removes a ${id} admin`;
  }
}
