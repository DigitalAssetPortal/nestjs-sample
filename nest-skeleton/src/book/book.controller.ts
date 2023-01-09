import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LOGGER } from '../common/core.module';
import { CommonExceptionFilter } from '../common/filters/common-exception.filter';
import { CommonApiResponse } from '../common/models/api.models';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { Logger } from 'winston';

@ApiTags('books')
@UseFilters(CommonExceptionFilter)
@Controller({
    path: 'books',
    version: '1'
})
export class BookController {
    constructor(private readonly bookService: BookService,
        @Inject(LOGGER) private readonly logger: Logger,
        @InjectConnection() private readonly connection: Connection) { }

    @Post('/create')
    async createBookDetails(@Body() bookDto: BookDto): Promise<CommonApiResponse> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            this.logger.info('[BookController]: Api called to create Book.')
            const newUser: any = await this.bookService.createBookDetails(bookDto, session);
            await session.commitTransaction();
            return newUser;
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`[BookController]: Error while creating Book: ${error}`)
            throw error
        } finally {
            session.endSession();
        }
    }

    @Get('/:id')
    async getBookDetailsById(@Param('id') id: string): Promise<CommonApiResponse> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            this.logger.info('[BookController]: Api called to fetching Book details.')
            const newUser: any = await this.bookService.getBookDetailsById(id);
            await session.commitTransaction();
            return newUser;
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`[BookController]: Error while fetching Book details: ${error}`)
            throw error
        } finally {
            session.endSession();
        }
    }

    @Get('/')
    async getBookDetails(): Promise<CommonApiResponse> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            this.logger.info('[BookController]: Api called to fetch all Book Details.')
            const newUser: any = await this.bookService.getBookDetails();
            await session.commitTransaction();
            return newUser;
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`[BookController]: Error while fetching all Book Details: ${error}`)
            throw error
        } finally {
            session.endSession();
        }
    }

    @Patch('/:id/update')
    async updateBookDetails(@Param('id') id: string, @Body() bookDto: BookDto): Promise<CommonApiResponse> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            this.logger.info('[BookController]: Api called to update Book.')
            const newUser: any = await this.bookService.updateBookDetails(bookDto, session);
            await session.commitTransaction();
            return newUser;
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`[BookController]: Error while updating Book: ${error}`)
            throw error
        } finally {
            session.endSession();
        }
    }

    @Delete('/:id')
    async deleteBookDetailsById(@Param('id') id: string): Promise<CommonApiResponse> {
        try {
            this.logger.info('[BookController]: Api called to create Book.')
            const newUser: any = await this.bookService.deleteBookDetailsById(id);
            return newUser;
        } catch (error) {
            this.logger.error(`[BookController]: Error while creating Book: ${error}`)
            throw error
        }
    }

    @Delete('/')
    async deleteAllBookDetails(): Promise<CommonApiResponse> {
        try {
            this.logger.info('[BookController]: Api called to delete all Books.')
            const newUser: any = await this.bookService.deleteAllBookDetails();
            return newUser;
        } catch (error) {
            this.logger.error(`[BookController]: Error while deleting Book: ${error}`)
            throw error
        }
    }
}
