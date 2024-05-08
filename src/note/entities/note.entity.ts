import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  is_available: boolean;

  @Column()
  category_id: string;

  @Column()
  grade: number;

  @Column({ nullable: true })
  cover_image_url: string;

  @Column({ nullable: true })
  pdfUrl: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @OneToMany(() => UserEntity, (user) => user.phone)
  users: UserEntity[];
}
