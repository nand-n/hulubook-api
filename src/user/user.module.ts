import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./user.service";
import { UsersController } from "./user.controller";
import { UserEntity } from "./entities/user.entity";
import { userrepository } from "./user.repository";
import { AuthenticationServise } from "src/auth/auth.service";
import { MulterModule } from "@nestjs/platform-express";
import { multerConfig } from "src/Utils/uploadImage";
import { BookEntity } from "src/book/entities/book.entity";
import { Payment } from "src/payment/entities/payment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, BookEntity, UserEntity]),
    MulterModule.register(multerConfig),
  ],
  providers: [UsersService, userrepository, AuthenticationServise],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
