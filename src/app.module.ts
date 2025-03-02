import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { CommentModule } from './comment/comment.module';
import { DiscussionModule } from './discussion/discussion.module';
import { HomeworkModule } from './homework/homework.module';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [AuthModule, AnnouncementModule, CommentModule, DiscussionModule, HomeworkModule, ResourceModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
