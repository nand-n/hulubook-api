import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UsersCreateDto } from "./dto/create-user.dto";
import { UsersService } from "./user.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthenticationDto } from "src/auth/dto/auth-dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RessetPasswordeDto } from "./dto/reset-password.dot";
import { ForgottPasswordeDto } from "./dto/forgot-password-dto";

@Controller("user")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async createUsers(
    @Body() createDto: UsersCreateDto,
    @UploadedFile() file,
  ): Promise<object> {
    return await this.userService.createUser(createDto, file);
  }

  @Post("login")
  async login(@Body() authDto: AuthenticationDto): Promise<object> {
    try {
      return await this.userService.userLogin(authDto);
    } catch (error) {
      return new HttpException("invalid input", HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllUser(): Promise<any> {
    return await this.userService.getAllusers();
  }

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<any> {
    try {
      return await this.userService.getuserById(id);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("fileuploads/:fileName")
  display(@Param("fileName") fileName: string, @Res() res) {
    res.sendFile(fileName, { root: "./uploads" });
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<any> {
    return await this.userService.deleteUser(id);
  }

  @Patch(":id")
  async updateUser(
    @Param("id") id: string,
    updateDto: UpdateUserDto,
  ): Promise<any> {
    return await this.userService.updateUser(id, updateDto);
  }

  @Post("reset")
  async resetPassword(ressetPasswordeDto: RessetPasswordeDto): Promise<any> {
    return await this.userService.resetPassword(ressetPasswordeDto);
  }

  @Post("forgotPassword")
  async forgotPassword(forgotPasswordDto: ForgottPasswordeDto): Promise<any> {
    return await this.userService.forgotPassword(forgotPasswordDto);
  }
}
