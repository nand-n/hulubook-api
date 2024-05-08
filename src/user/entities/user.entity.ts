// User.ts
import { IsOptional } from "class-validator";
import { Payment } from "src/payment/entities/payment.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column()
  phone: string;

  @Column()
  grade: number;

  @Column()
  gener: string;

  @Column({ nullable: true })
  bio: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: "false" })
  isDeleted: boolean;

  @Column({ nullable: true })
  profilePictureUrl: string;

  @IsOptional()
  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
}
