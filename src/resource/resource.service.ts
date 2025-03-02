import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from '@prisma/client';

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) {}

  async createResource(dto: CreateResourceDto): Promise<Resource> {
    try {
      return await this.prisma.resource.create({
        data: {
          ...dto,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to create resource: ' + error);
    }
  }

  async getResources(): Promise<Resource[]> {
    return this.prisma.resource.findMany({
      include: {
        User: true, // Include the author information
      },
    });
  }

  async getResourceById(id: number): Promise<Resource> {
    const resource = await this.prisma.resource.findUnique({
      where: { id },
      include: {
        User: true, // Include the author information
      },
    });

    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    return resource;
  }

  async updateResource(id: number, dto: UpdateResourceDto): Promise<Resource> {
    const resource = await this.prisma.resource.findUnique({
      where: { id },
    });

    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    try {
      return await this.prisma.resource.update({
        where: { id },
        data: {
          ...dto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to update resource: ' + error);
    }
  }

  async deleteResource(id: number): Promise<Resource> {
    const resource = await this.prisma.resource.findUnique({
      where: { id },
    });

    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    return this.prisma.resource.delete({
      where: { id },
    });
  }
}
