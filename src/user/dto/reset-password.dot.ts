import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class RessetPasswordeDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
