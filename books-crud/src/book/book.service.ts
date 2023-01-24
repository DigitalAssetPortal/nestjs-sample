import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LOGGER } from '../common/core.module';
import { ApiSuccessResponse, CommonApiResponse } from '../common/models/api.models';
import { Logger } from 'winston';
import { ClientSession } from 'mongoose';
import { BookRepository } from './repository/book.repository';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
    constructor(@Inject(LOGGER) private readonly logger: Logger,
        private readonly bookRepository: BookRepository) { }

    // Create 
    async createBookDetails(createBookDto: BookDto, session: ClientSession, requestId: string): Promise<CommonApiResponse> {
        try {
            this.logger.info(`[BookService] [${requestId}]: Api called to create Book.`)
            const bookDetails = await this.bookRepository.addBook(createBookDto, session);
            const apiResult: CommonApiResponse<ApiSuccessResponse<any>> = this.constructResponse(requestId, `Book created successfully.`, bookDetails, HttpStatus.CREATED)
            return apiResult
        } catch (error) {
            this.logger.error(`[BookService] [${requestId}]: `, error)
            return error
        }
    }


    // Get one by ID
    async getBookDetailsById(id: string, requestId: string): Promise<CommonApiResponse> {
        try {
            this.logger.info(`[BookService] [${requestId}]: Api called to fetch Book details.`)
            const bookDetails = await this.bookRepository.getBookById(id);
            const apiResult: CommonApiResponse<ApiSuccessResponse<any>> = this.constructResponse(requestId, `Fetched Book successfully.`, bookDetails, HttpStatus.OK)
            return apiResult
        } catch (error) {
            this.logger.error(`[BookService] [${requestId}]: `, error)
            return error
        }
    }


    // Get All
    async getBookDetails(requestId: string): Promise<CommonApiResponse> {
        try {
            this.logger.info(`[BookService] [${requestId}]: Api called to fetch all Book Details.`)
            const bookDetails = await this.bookRepository.getAllBooks();
            const apiResult: CommonApiResponse<ApiSuccessResponse<any>> = this.constructResponse(requestId, `Fetched Books List successfully.`, bookDetails, HttpStatus.OK)
            return apiResult
        } catch (error) {
            this.logger.error(`[BookService] [${requestId}]: `, error)
            return error
        }
    }


    // Update
    async updateBookDetails(createBookDto: BookDto, session: ClientSession, requestId: string): Promise<CommonApiResponse> {
        try {
            this.logger.info(`[BookService] [${requestId}]: Api called to update Book.`)
            const bookDetails = await this.bookRepository.updateBookDetails(createBookDto, session);
            const apiResult: CommonApiResponse<ApiSuccessResponse<any>> = this.constructResponse(requestId, `Book details updated successfully.`, bookDetails, HttpStatus.OK)
            return apiResult
        } catch (error) {
            this.logger.error(`[BookService] [${requestId}]: `, error)
            return error
        }
    }


    // Delete one by ID 
    async deleteBookDetailsById(id: string, requestId: string): Promise<CommonApiResponse> {
        try {
            this.logger.info(`[BookService] [${requestId}]: Api called to delete Book.`)
            const bookDetails = await this.bookRepository.deleteBookById(id);
            const apiResult: CommonApiResponse<ApiSuccessResponse<any>> = this.constructResponse(requestId, `Deleted Book successfully.`, bookDetails, HttpStatus.OK)
            return apiResult
        } catch (error) {
            this.logger.error(`[BookService] [${requestId}]: `, error)
            return error
        }
    }


    // Delete All
    async deleteAllBookDetails(requestId: string): Promise<CommonApiResponse> {
        try {
            this.logger.info(`[BookService] [${requestId}]: Api called to delete all Books.`)
            const bookDetails = await this.bookRepository.deleteAllBooks();
            const apiResult: CommonApiResponse<ApiSuccessResponse<any>> = this.constructResponse(requestId, `Deleted All Books successfully.`, bookDetails, HttpStatus.OK)
            return apiResult
        } catch (error) {
            this.logger.error(`[BookService] [${requestId}]: `, error)
            return error
        }
    }

    // Response conctructor
    constructResponse(requestId: string, message: string, data?: Record<string, unknown>, status = HttpStatus.OK): CommonApiResponse<ApiSuccessResponse<Record<string, unknown>>> {
        const apiResult: CommonApiResponse<ApiSuccessResponse<Record<string, unknown>>> = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            requestId: requestId,
            message: message,
            data: data
        }
        return apiResult
    }

}