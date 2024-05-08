import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersCreateDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { RessetPasswordeDto } from "./dto/reset-password.dot";
import { hashPassword } from "src/Utils/hashPassword";
import { AuthenticationDto } from "src/auth/dto/auth-dto";
import { ComparePassword, generrateToken } from "src/Utils/comparePassword";
import { UpdateUserDto } from "./dto/update-user.dto";
import { isEmail } from "class-validator";
import { ForgottPasswordeDto } from "./dto/forgot-password-dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository,
  ) {}

  async resetPassword(resetPasswordDto: RessetPasswordeDto): Promise<any> {
    try {
      const userExists = await this.getusers(resetPasswordDto.email);
      if (userExists) {
        //send email
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }
  async sendOTP(
    otp: string,
    recipient: string,
    isEmail: boolean,
  ): Promise<boolean> {
    try {
      // Replace this logic with your actual code to send OTP
      if (isEmail) {
        // Send OTP to email
        // sendEmail(recipient, `Your OTP is: ${otp}`);
        console.log(`OTP sent to email: ${recipient}`);
      } else {
        // Send OTP to phone number
        // sendSMS(recipient, `Your OTP is: ${otp}`);
        console.log(`OTP sent to phone number: ${recipient}`);
      }
      return true; // Indicate successful sending of OTP
    } catch (error) {
      console.error("Error sending OTP:", error);
      return false; // Indicate failure in sending OTP
    }
  }
  async forgotPassword(forgotPasswordDto: ForgottPasswordeDto): Promise<any> {
    try {
      let userExists;

      if (forgotPasswordDto.email) {
        userExists = await this.getusers(forgotPasswordDto.email);
      } else if (forgotPasswordDto.phone) {
        userExists = await this.getUserByPhoneNumber(forgotPasswordDto.phone);
      } else {
        throw new Error("Neither email nor phone provided");
      }
      if (userExists) {
        const otp = this.generateOTP();
        let recipient: string;
        if (forgotPasswordDto.email) {
          recipient = forgotPasswordDto.email;
        } else {
          recipient = forgotPasswordDto.phone!;
        }
        const isEmail = !!forgotPasswordDto.email;

        const otpSent = await this.sendOTP(otp, recipient, isEmail);

        if (otpSent) {
          return { success: true, message: "OTP sent successfully" };
        } else {
          return { success: false, message: "Failed to send OTP" };
        }
      } else {
        return { success: false, message: "User does not exist" };
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllusers(): Promise<any> {
    try {
      const user = await this.userRepository.find({
        where: { isDeleted: false },
      });

      return {
        message: "Success",
        status: 200,
        user: user,
      };
    } catch (error) {
      return new HttpException("user not found", HttpStatus.NOT_FOUND);
    }
  }

  async getuserById(id: string): Promise<object> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id, isDeleted: false },
      });

      if (!user) {
        return new HttpException("user not found", HttpStatus.NOT_FOUND);
      }

      return {
        message: "Success",
        status: 200,
        user: user,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(createDto: UsersCreateDto, file: any): Promise<object> {
    try {
      const hashedPassword = await hashPassword(createDto.password);
      const userExists = await this.getusers(createDto.email);

      if (userExists) {
        return new HttpException("email already exists", HttpStatus.FOUND);
      } else {
        const imagePath = file?.path.replace(/\\/g, "/");
        createDto.profilePictureUrl = imagePath;
        createDto.password = hashedPassword;
        const user = this.userRepository.create(createDto);
        const createdUser = await this.userRepository.save(user);

        return createdUser;
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getusers(email: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email, isDeleted: false },
      });

      return user;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByPhoneNumber(phone: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { phone: phone, isDeleted: false },
      });

      return user;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async userLogin(authDto: AuthenticationDto): Promise<any> {
    try {
      // const user = await this.getusers(authDto.email);
      let user: { password: string; id: string };
      if (isEmail(authDto.email)) {
        user = await this.getusers(authDto.email);
      } else {
        user = await this.getUserByPhoneNumber(authDto.phone);
      }
      if (!user) {
        return new HttpException(
          "email or phone number doesnt exist",
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const cheakPassword = await ComparePassword(
          authDto.password,
          user.password,
        );

        if (cheakPassword) {
          const token = await generrateToken(user.id, process.env.JWT_SECRET);
          return {
            message: "Successfuly loggedIn",
            user: user,
            token: token,
          };
        } else {
          return new HttpException(
            "incorrect Password",
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: string, updateDto: UpdateUserDto): Promise<any> {
    try {
      const updatedUser = this.userRepository.update(id, updateDto);
      return updatedUser;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string): Promise<any> {
    try {
      const deletedUser = await this.userRepository.update(id, {
        isDeleted: true,
      });
      return deletedUser;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
