import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LOGGER } from '../common/core.module';
import { CommonExceptionFilter } from '../common/filters/common-exception.filter';
import { CommonApiResponse } from '../common/models/api.models';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { Logger } from 'winston';
import { randomUUID } from 'crypto';

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

    // Create
    @Post('/create')
    @ApiOperation({ description: "API to create book details." })
    async createBookDetails(@Body() bookDto: BookDto): Promise<CommonApiResponse> {
        const requestId = randomUUID();
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            this.logger.info(`[BookController] [${requestId}]: Api called to create Book.`)
            const newUser: any = await this.bookService.createBookDetails(bookDto, session, requestId);
            await session.commitTransaction();
            return newUser;
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`[BookController] [${requestId}]: Error while creating Book: ${error}`)
            throw error
        } finally {
            session.endSession();
        }
    }


    // Get one by ID
    @Get('/:id')
    @ApiOperation({ description: "API to get book details by bookId." })
    async getBookDetailsById(@Param('id') id: string): Promise<CommonApiResponse> {
        const requestId = randomUUID();
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            this.logger.info(`[BookController] [${requestId}]: Api called to fetch Book details.`)
            const newUser: any = await this.bookService.getBookDetailsById(id, requestId);
            await session.commitTransaction();
            return newUser;
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`[BookController] [${requestId}]: Error while fetching Book details: ${error}`)
            throw error
        } finally {
            session.endSession();
        }
    }


    // Get All
    @Get('/')
    @ApiOperation({ description: "API to get all book details." })
    async getBookDetails(): Promise<CommonApiResponse> {
        const requestId = randomUUID();
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            this.logger.info(`[BookController] [${requestId}]: Api called to fetch all Book Details.`)
            const newUser: any = await this.bookService.getBookDetails(requestId);
            await session.commitTransaction();
            return newUser;
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`[BookController] [${requestId}]: Error while fetching all Book Details: ${error}`)
            throw error
        } finally {
            session.endSession();
        }
    }


    // Update
    @Patch('/:id/update')
    @ApiOperation({ description: "API to update book details by bookId." })
    async updateBookDetails(@Param('id') id: string, @Body() bookDto: BookDto): Promise<CommonApiResponse> {
        const requestId = randomUUID();
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            this.logger.info(`[BookController] [${requestId}]: Api called to update Book.`)
            const newUser: any = await this.bookService.updateBookDetails(bookDto, session, requestId);
            await session.commitTransaction();
            return newUser;
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`[BookController] [${requestId}]: Error while updating Book: ${error}`)
            throw error
        } finally {
            session.endSession();
        }
    }


    // Delete one by ID 
    @Delete('/:id')
    @ApiOperation({ description: "API to delete book details by bookId." })
    async deleteBookDetailsById(@Param('id') id: string): Promise<CommonApiResponse> {
        const requestId = randomUUID();
        try {
            this.logger.info(`[BookController] [${requestId}]: Api called to delete Book.`)
            const newUser: any = await this.bookService.deleteBookDetailsById(id, requestId);
            return newUser;
        } catch (error) {
            this.logger.error(`[BookController] [${requestId}]: Error while deleting Book: ${error}`)
            throw error
        }
    }


    // Delete All
    @Delete('/')
    @ApiOperation({ description: "API to delete all book details." })
    async deleteAllBookDetails(): Promise<CommonApiResponse> {
        const requestId = randomUUID();
        try {
            this.logger.info(`[BookController] [${requestId}]: Api called to delete all Books.`)
            const newUser: any = await this.bookService.deleteAllBookDetails(requestId);
            return newUser;
        } catch (error) {
            this.logger.error(`[BookController] [${requestId}]: Error while deleting Book: ${error}`)
            throw error
        }
    }
}
