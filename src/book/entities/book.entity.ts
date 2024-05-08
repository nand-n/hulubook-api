// Book.ts
// import { Category } from "src/category/entities/category.entity";
import { IsOptional } from "class-validator";
import { Payment } from "src/payment/entities/payment.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  // ManyToOne,
  OneToMany,
} from "typeorm";

@Entity()
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  isAvailable: boolean;

  // @IsOptional()
  // @Column()
  // category_id: string;

  // @ManyToOne(() => Category, (category) => category.books)
  // category: Category;

  @IsOptional()
  @Column()
  desctiopion: string;
  @Column()
  grade: number;

  @Column({ nullable: true })
  coverImageUrl: string;

  @Column({ nullable: true })
  pdfUrl: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @IsOptional()
  @OneToMany(() => Payment, (payment) => payment.book)
  payments: Payment[];
}
