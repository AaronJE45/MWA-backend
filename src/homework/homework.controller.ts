import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { UpdateHomeworkDto } from './dto/update-homework.dto';

@Controller('homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  createHomework(@Body() createHomeworkDto: CreateHomeworkDto) {
    return this.homeworkService.createHomework(createHomeworkDto);
  }

  @Get()
  getHomework() {
    return this.homeworkService.getHomework();
  }

  @Get(':id')
  getHomeworkById(@Param('id') id: number) {
    return this.homeworkService.getHomeworkById(id);
  }

  @Patch(':id')
  updateHomework(@Param('id') id: number, @Body() updateHomeworkDto: UpdateHomeworkDto) {
    return this.homeworkService.updateHomework(id, updateHomeworkDto);
  }

  @Delete(':id')
  deleteHomework(@Param('id') id: number) {
    return this.homeworkService.deleteHomework(id);
  }
}
