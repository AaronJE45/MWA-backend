import { IsInt, IsOptional, IsString } from "class-validator";
export class UpdateDiscussionDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsInt()
    authorId?: number;
}