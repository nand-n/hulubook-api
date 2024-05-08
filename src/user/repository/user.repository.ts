// import { EntityRepository, Repository } from "typeorm";
// import * as bcrypt from "bcrypt";
// import {
//   ConflictException,
//   InternalServerErrorException,
// } from "@nestjs/common";
// import { User } from "../entities/user.entity";
// import { UsersCreateDto } from "../dto/create-user.dto";

// @EntityRepository(User)
// export class UserRepository extends Repository<User> {
//   createUser = async (payload: UsersCreateDto): Promise<void> => {
//     const {
//       first_name,
//       last_name,
//       email,
//       password,
//       age,
//       bio,
//       gener,
//       grade,
//       phone,
//     } = payload;

//     const user = this.create();
//     user.first_name = first_name;
//     user.last_name = last_name;
//     user.email = email;
//     user.age = age;
//     user.password = await bcrypt.hash(password, await bcrypt.genSalt());
//     user.bio = bio;
//     user.gener = gener;
//     user.grade = grade;
//     user.phone = phone;

//     try {
//       await user.save();
//     } catch (error) {
//       if (error.code == "23505") {
//         throw new ConflictException(`Email ${email} already used`);
//       } else {
//         throw new InternalServerErrorException(error);
//       }
//     }
//   };
//   getUsers = async () => {
//     try {
//       return await this.find();
//     } catch (error) {
//       throw new InternalServerErrorException(error);
//     }
//   };
// }
