// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { UserEntity } from "../user/entities/user.entity";
// import { Repository } from "typeorm";

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
//   ) {}

//   async validateUser(body: any) {
//     const { email, age, bio, first_name, last_name, gener, phone } = body;
//     const user = await this.userRepo.findOne({ where: { email: email } });

//     if (user) {
//       return user;
//     }

//     const newUser = this.userRepo.create({
//       email,
//       age,
//       bio,
//       first_name,
//       last_name,
//       gener,
//       phone,
//     });
//     await this.userRepo.save(newUser);
//     return newUser;
//   }

//   async findUser(id: string) {
//     const user = await this.userRepo.findOneById(id);
//     return user;
//   }

//   handlerLogin() {
//     return "handlerLogin";
//   }

//   handlerRedirect() {
//     return "handlerRedirect";
//   }
// }

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import { AuthenticationDto } from "src/Dto/users/auth-dto";

// import { UsersService } from "./user.service";

import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { AuthenticationDto } from "./dto/auth-dto";
import { UsersService } from "src/user/user.service";
import { IAuthenticationServiseInterface } from "./interfaces/auth.service.interface";
// import { IAuthenticationServiseInterface } from "src/Interfaces/authenticationServise.Interface";
@Injectable()
export class AuthenticationServise implements IAuthenticationServiseInterface {
  constructor(private usersService: UsersService) {}

  async userLogin(authDto: AuthenticationDto): Promise<any> {
    try {
      const user = await this.usersService.getusers(authDto.email);
      if (user) {
        const cheakPassword = bcrypt.compareSync(
          authDto.password,
          user.password,
        );
        if (cheakPassword) {
          const token = jwt.sign(user.id, "1234");
          return {
            user: user,
            token: token,
          };
        }
      } else {
        return new HttpException("unauthorized user", HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
