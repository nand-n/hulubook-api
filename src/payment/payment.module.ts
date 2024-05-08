import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentController } from "./payment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { BookEntity } from "src/book/entities/book.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Payment, BookEntity, UserEntity])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
