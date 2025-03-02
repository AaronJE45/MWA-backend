import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.resourceService.createResource(createResourceDto);
  }

  @Get()
  getResources() {
    return this.resourceService.getResources();
  }

  @Get(':id')
  getResourceById(@Param('id') id: number) {
    return this.resourceService.getResourceById(id);
  }

  @Patch(':id')
  updateResource(@Param('id') id: number, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourceService.updateResource(id, updateResourceDto);
  }

  @Delete(':id')
  deleteResource(@Param('id') id: number) {
    return this.resourceService.deleteResource(id);
  }
}
