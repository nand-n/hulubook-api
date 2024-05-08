import { UsersCreateDto } from "../dto/create-user.dto";
import { RessetPasswordeDto } from "../dto/reset-password.dot";
import { UpdateUserDto } from "../dto/update-user.dto";

export interface IUserServiceInterface {
  createUser(createDto: UsersCreateDto, file: any): Promise<object>;
  getusers(email: string): Promise<object>;
  getuserById(id: string): Promise<object>;
  getAllusers(): Promise<any>;
  deleteUser(id: string): Promise<any>;
  updateUser(id: string, updateDto: UpdateUserDto): Promise<any>;
  ressetPassword(resetPasswordDto: RessetPasswordeDto): Promise<any>;
}
