// Payment.ts
import { IsIn, IsOptional } from "class-validator";
import { BookEntity } from "src/book/entities/book.entity";
import { UserEntity } from "src/user/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsOptional()
  @ManyToOne(() => UserEntity, (user) => user.payments)
  user: UserEntity;

  @IsOptional()
  @ManyToOne(() => BookEntity, (book) => book.payments)
  book: BookEntity;

  @IsOptional()
  @Column({ nullable: true })
  amount: number;

  @IsOptional()
  @Column({ nullable: true })
  payment_date: Date;

  @IsOptional()
  @Column({ nullable: true })
  payment_method: string;

  @IsOptional()
  @Column({ default: "PENDING" })
  @IsIn(["PENDING", "COMPLETED"])
  status: string;
  @IsOptional()
  @Column({ nullable: true })
  tx_ref: string;
}
