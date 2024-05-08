import { IsOptional, IsString } from "class-validator";

export class AuthenticationDto {
  @IsString()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  phone: string;
  @IsString()
  password: string;
}
