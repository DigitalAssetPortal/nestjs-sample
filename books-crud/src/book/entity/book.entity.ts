import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString } from "class-validator";

@Schema()
export class Book extends Document {
    @IsString()
    @Prop({ required: true })
    bookId: string;

    @IsString()
    @Prop({ required: true })
    title: string;

    @IsString()
    @Prop({ required: true })
    author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
