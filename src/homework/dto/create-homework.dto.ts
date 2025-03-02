import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHomeworkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsInt()
  authorId: number;

  @IsOptional()
  @IsInt()
  studentId?: number;

  @IsDate()
  dueDate: Date;

  @IsOptional()
  @IsString()
  grade?: string;
}
