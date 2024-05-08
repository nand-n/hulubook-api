// import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// import * as bcrypt from "bcrypt";
// import * as jwt from "jsonwebtoken";
// import { AuthenticationDto } from "src/auth/dto/auth-dto";
// import { IAuthenticationServiseInterface } from "src/auth/interfaces/auth.service.interface";
// import { UsersService } from "src/user/user.service";
// @Injectable()
// export class AuthenticationServise implements IAuthenticationServiseInterface {
//   constructor(private usersService: UsersService) {}

//   async userLogin(authDto: AuthenticationDto): Promise<any> {
//     try {
//       const user = await this.usersService.getusers(authDto.email);
//       if (user) {
//         const cheakPassword = bcrypt.compareSync(
//           authDto.password,
//           user.password,
//         );
//         if (cheakPassword) {
//           const token = jwt.sign(user.id, "1234");
//           return {
//             user: user,
//             token: token,
//           };
//         }
//       } else {
//         return new HttpException("unauthorized user", HttpStatus.UNAUTHORIZED);
//       }
//     } catch (error) {
//       return new HttpException(error.message, HttpStatus.BAD_REQUEST);
//     }
//   }
// }

import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UsersService } from "src/user/user.service";

@Injectable()
export class Authentication implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: any, res: any, next: NextFunction) {
    try {
      const header = (req.headers as any).authorization;
      if (header && header.split(" ")[0] === "Bearer") {
        const token = header.split(" ")[1];
        if (!token) {
          throw new HttpException(
            "Please Login First",
            HttpStatus.UNAUTHORIZED,
          );
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = (verifyToken as any).id;
        const user = await this.usersService.getuserById(id);
        req.user = user;
        next();
      } else {
        throw new HttpException("Please Login First", HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      return next(new HttpException(error.message, HttpStatus.UNAUTHORIZED));
    }
  }
}
