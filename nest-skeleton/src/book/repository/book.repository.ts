import { ClientSession, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException, Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { LOGGER } from '../../common/core.module';
import { Book } from '../entity/book.entity';
import { BookDto } from '../dto/book.dto';

export class BookRepository {
    constructor(
        @InjectModel(Book.name) private readonly bookModel: Model<Book>,
        @Inject(LOGGER) private readonly logger: Logger) { }

    async addBook(bookDto: BookDto, session: ClientSession) {
        let book = await this.getBookById(bookDto.bookId);
        if (book) {
            throw new ConflictException('Book already exist.');
        }
        book = new this.bookModel({ ...bookDto });

        try {
            book = await book.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!book) {
            throw new InternalServerErrorException('Book not added.');
        }

        return book;
    }

    async getBookById(id: string) {
        let book;
        try {
            book = await this.bookModel.findOne({ $and: [{ isActive: true }, { bookId: id }] }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return book;
    }

    async getAllBooks() {
        let books;
        try {
            books = await this.bookModel.find({ $and: [{ isActive: true }] }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return books;
    }

    async updateBookDetails(bookDto: BookDto, session: ClientSession) {
        let book;
        try {
            book = await this.bookModel.findOneAndUpdate({ $and: [{ isActive: true }, { bookId: bookDto.bookId }] }, bookDto, { new: true }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!book) {
            throw new InternalServerErrorException('Book not updated.');
        }

        return book;
    }

    async deleteBookById(id: string) {
        let book;
        try {
            book = await this.bookModel.remove({ $and: [{ isActive: true }, { bookId: id }] }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return book;
    }

    async deleteAllBooks() {
        let book;
        try {
            book = await this.bookModel.remove({ $and: [{ isActive: true }] }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return book;
    }
}
