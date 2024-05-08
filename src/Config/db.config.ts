import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BookEntity } from "src/book/entities/book.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { UserEntity } from "src/user/entities/user.entity";

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [BookEntity, UserEntity, Payment],
  synchronize: true,
});