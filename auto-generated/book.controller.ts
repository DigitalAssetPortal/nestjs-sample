import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface Book {
    id: string;
    title: string;
    author: string;
}

@Controller('books')
export class BookController {
    constructor(@InjectModel('Book') private bookModel: Model<Book>) { }

    @Post()
    async addBook(@Body() book: Book): Promise<Book> {
        const createdBook = new this.bookModel(book);
        return createdBook.save();
    }

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    @Get(':id')
    async getBook(@Param('id') id: string): Promise<Book> {
        return this.bookModel.findOne({ _id: id }).exec();
    }

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() book: Book): Promise<Book> {
        return this.bookModel.findByIdAndUpdate(id, book, { new: true }).exec();
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<Book> {
        return this.bookModel.findByIdAndRemove(id).exec();
    }
}