import { Injectable, Post, Get, Delete, Patch } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';

@Injectable()
export class DiscussionService {
    constructor(private prisma: PrismaService) {}

    @Post()
    async createDiscussion(createDiscussionDto: CreateDiscussionDto){
        try {
            return this.prisma.discussion.create({
            data: {
                title: createDiscussionDto.title,
                content: createDiscussionDto.content,
                authorId: createDiscussionDto.authorId,
            },
            });
        } catch (error) {
            throw new Error(`Failed to create discussion: ${error}`);
        }
    }

    @Get()
    async getDiscussions(){
        try {
            return this.prisma.discussion.findMany();
        } catch (error) {
            throw new Error(`Failed to get discussions: ${error}`)
            }
        }
    @Get(':id') 
    async getDiscussionById(id: number){
        try {
            const discussion = await this.prisma.discussion.findUnique({
                where: { id },
            });

            if (!discussion) {
                throw new Error(`Discussion with ID ${id} not found`);
            }

            return discussion;
        } catch (error) {
            throw new Error(`Failed to get discussion: ${error}`);
        }
    }

    @Patch(':id')
    async updateDiscussion(updateDiscussionDto: CreateDiscussionDto, id: number){
        try {
            const discussion = await this.prisma.discussion.findUnique({
                where: { id },
            });
    
            if (!discussion) {
                throw new Error(`Discussion with ID ${id} not found`);
            }
    
            return discussion;
            
        } catch (error) {
            throw new Error(`Failed to update discussion: ${error}`);   
        }


    }

    @Delete(':id')
    async deleteDiscussion(id: number){
        try {
            const discussion = await this.prisma.discussion.findUnique({
                where: { id },
            });
    
            if (!discussion) {
                throw new Error(`Discussion with ID ${id} not found`);
            }
            return discussion
        } catch (error) {
            throw new Error(`Failed to delete discussion: ${error}`);
        }
    }
}
