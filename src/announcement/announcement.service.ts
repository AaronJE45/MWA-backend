import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { Announcement } from '@prisma/client'; // Import the Announcement type

@Injectable()
export class AnnouncementService {
    constructor(private prisma: PrismaService) {}

    async createAnnouncement(dto: CreateAnnouncementDto): Promise<Announcement> {
        try {
            return await this.prisma.announcement.create({
                data: {
                    ...dto,
                    updatedAt: new Date(),
                    User: {
                        connect: { id: parseInt(dto.userId) }
                    }
                },
            });
        } catch (error: any) { // Explicitly typing the error as 'any'
            throw new BadRequestException('Failed to create announcement: ' + error);
        }
    }

    async getAnnouncements(): Promise<Announcement[]> {
        return this.prisma.announcement.findMany({
            include: {
                User: true
            }
        });
    }

    async getAnnouncementById(id: number): Promise<Announcement> {
        const announcement = await this.prisma.announcement.findUnique({
            where: { id },
            include: {
                User: true
            }
        });

        if (!announcement) {
            throw new NotFoundException(`Announcement with ID ${id} not found`);
        }

        return announcement;
    }

    async updateAnnouncement(id: number, dto: CreateAnnouncementDto): Promise<Announcement> {
        const announcement = await this.prisma.announcement.findUnique({
            where: { id }
        });

        if (!announcement) {
            throw new NotFoundException(`Announcement with ID ${id} not found`);
        }

        try {
            return await this.prisma.announcement.update({
                where: { id },
                data: {
                    ...dto,
                    updatedAt: new Date(),
                    User: {
                        connect: { id: parseInt(dto.userId) }
                    }
                }
            });
        } catch (error: any) { // Explicitly typing the error as 'any'
            throw new BadRequestException('Failed to update announcement: ' + error);
        }
    }

    async deleteAnnouncement(id: number): Promise<Announcement> {
        const announcement = await this.prisma.announcement.findUnique({
            where: { id }
        });

        if (!announcement) {
            throw new NotFoundException(`Announcement with ID ${id} not found`);
        }

        return this.prisma.announcement.delete({
            where: { id }
        });
    }
}
