import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookEntity } from "src/book/entities/book.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Payment } from "src/payment/entities/payment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, UserEntity, Payment])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
