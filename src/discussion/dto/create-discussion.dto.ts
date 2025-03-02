import { IsString, IsNotEmpty, IsInt } from 'class-validator';
export class CreateDiscussionDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsInt()
    authorId: number;
}