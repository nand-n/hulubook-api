import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
export class CreateBookDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  price: number;
  @ApiProperty()
  @IsString()
  isAvailable: boolean;
  //   @ApiProperty()
  //   @IsString()
  //   @IsOptional()
  //   category: string;
  @ApiProperty()
  @IsString()
  grade: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  coverImageUrl: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  pdfUrl: string;
  // @ApiProperty()
  // // @IsString()
  // // category_id: string;
  // @ApiProperty()
  // @IsString()
  // cover: any;
  // @ApiProperty()
  // @IsString()
  // pdf: any;
}
