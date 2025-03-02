import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  createAnnouncement(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementService.createAnnouncement(createAnnouncementDto);
  }

  @Get()
  getAnnouncements() {
    return this.announcementService.getAnnouncements();
  }

  @Get(':id')
  getAnnouncementById(id: number) {
    return this.announcementService.getAnnouncementById(id);
  }

  @Patch(':id')
  updateAnnouncement(@Body() UpdateAnnouncementDto: UpdateAnnouncementDto, id: number) {
    return this.announcementService.updateAnnouncement(id, UpdateAnnouncementDto);
  }

  @Delete(':id')
  deleteAnnouncement(id: number) {
    return this.announcementService.deleteAnnouncement(id);
  }
}
