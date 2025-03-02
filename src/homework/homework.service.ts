import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';
import { Homework } from '@prisma/client';

@Injectable()
export class HomeworkService {
  constructor(private prisma: PrismaService) {}

  async createHomework(dto: CreateHomeworkDto): Promise<Homework> {
    try {
      return await this.prisma.homework.create({
        data: {
          ...dto,
          submittedAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create homework: ' + error);
    }
  }

  async getHomework(): Promise<Homework[]> {
    return this.prisma.homework.findMany({
      include: {
        User: true,
        Student: true,
      },
    });
  }

  async getHomeworkById(id: number): Promise<Homework> {
    const homework = await this.prisma.homework.findUnique({
      where: { id },
      include: {
        User: true,
        Student: true,
      },
    });

    if (!homework) {
      throw new NotFoundException(`Homework with ID ${id} not found`);
    }

    return homework;
  }

  async updateHomework(id: number, dto: UpdateHomeworkDto): Promise<Homework> {
    const homework = await this.prisma.homework.findUnique({
      where: { id },
    });

    if (!homework) {
      throw new NotFoundException(`Homework with ID ${id} not found`);
    }

    try {
      return await this.prisma.homework.update({
        where: { id },
        data: {
          ...dto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to update homework: ' + error);
    }
  }

  async deleteHomework(id: number): Promise<Homework> {
    const homework = await this.prisma.homework.findUnique({
      where: { id },
    });

    if (!homework) {
      throw new NotFoundException(`Homework with ID ${id} not found`);
    }

    return this.prisma.homework.delete({
      where: { id },
    });
  }
}
