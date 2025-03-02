import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '@prisma/client'; // Import the Comment type

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) {}

    async createComment(dto: CreateCommentDto): Promise<Comment> {
        return this.prisma.comment.create({
            data: {
                content: dto.content,
                authorId: dto.authorId,
                discussionId: dto.discussionId,
            },
        });
    }

    async getComments(): Promise<Comment[]> {
        return this.prisma.comment.findMany();
    }

    async getCommentById(id: number): Promise<Comment> {
        const comment = await this.prisma.comment.findUnique({
            where: { id },
        });
        if (!comment) {
            throw new NotFoundException(`Comment with ID ${id} not found`);
        }
        return comment;
    }

    async updateComment(updateDto: UpdateCommentDto, id: number): Promise<Comment> {
        const data: Partial<Comment> = {};
        if (updateDto.content) {
            data.content = updateDto.content;
        }
        if (updateDto.discussionId) {
            data.discussionId = updateDto.discussionId;
        }

        return this.prisma.comment.update({
            where: { id },
            data,
        });
    }

    async deleteComment(id: number): Promise<Comment> {
        const comment = await this.prisma.comment.findUnique({
            where: { id },
        });
        if (!comment) {
            throw new NotFoundException(`Comment with ID ${id} not found`);
        }
        return this.prisma.comment.delete({
            where: { id },
        });
    }
}
