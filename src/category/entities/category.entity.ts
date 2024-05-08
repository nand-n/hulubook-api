// Category.ts
// import { BookEntity } from "src/book/entities/book.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  // OneToMany,
} from "typeorm";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  name: string;

  // @OneToMany(() => BookEntity, (book) => book.category)
  // books: BookEntity[];
}
