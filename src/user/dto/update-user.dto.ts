import { PartialType } from "@nestjs/swagger";
import { UsersCreateDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(UsersCreateDto) {}
