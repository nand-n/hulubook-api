import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookEntity } from "./entities/book.entity";
import { MulterModule } from "@nestjs/platform-express";
import { multerOptionsForBooks } from "src/Utils/bookUploader";
import { UserEntity } from "src/user/entities/user.entity";
import { Payment } from "src/payment/entities/payment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity, UserEntity, Payment]),
    MulterModule.register(multerOptionsForBooks),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
