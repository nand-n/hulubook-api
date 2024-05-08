// import { Module } from "@nestjs/common";
// import { AuthService } from "./auth.service";
// import { AuthController } from "./auth.controller";
// import { ConfigModule } from "@nestjs/config";
// import { TypeOrmModule } from "@nestjs/typeorm";
// import { User } from "src/user/entities/user.entity";
// import { PassportModule } from "@nestjs/passport";
// import { GoogleStrategy } from "./strategy/google.strategy";
// import { SessionSerializer } from "./serializer/session.serializer";

// @Module({
//   imports: [
//     PassportModule.register({ session: true }),
//     ConfigModule.forRoot({
//       isGlobal: true,
//       envFilePath: ".env",
//     }),
//     TypeOrmModule.forFeature([User]),
//   ],
//   controllers: [AuthController],
//   providers: [
//     AuthService,
//     GoogleStrategy,
//     { provide: "AUTH_SERVICE", useClass: AuthService },
//     SessionSerializer,
//   ],
// })
// export class AuthModule {}

// import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import { STATUS_CODES } from "http";
// // import { AuthenticationDto } from "src/Dto/users/auth-dto";

// // import { UsersService } from "./user.service";

// import * as bcrypt from "bcrypt";
// import * as jwt from "jsonwebtoken";
// import { UsersService } from "src/user/user.service";
// import { AuthenticationDto } from "./dto/auth-dto";
// // import { IAuthenticationServiseInterface } from "src/Interfaces/authenticationServise.Interface";
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
