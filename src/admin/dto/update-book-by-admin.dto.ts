import { PartialType } from "@nestjs/swagger";
import { CreateBookDto } from "src/book/dto/create-book.dto";

export class UpdateBookAdminDto extends PartialType(CreateBookDto) {}
