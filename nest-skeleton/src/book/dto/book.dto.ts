import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from "class-validator";

export class BookDto {
    @IsString()
    @IsNotEmpty()
    bookId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;
}