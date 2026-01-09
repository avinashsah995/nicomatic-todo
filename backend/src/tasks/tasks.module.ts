import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksGateway } from './tasks.gateway';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [TasksService, TasksGateway, PrismaService],
  controllers: [TasksController],
  exports: [TasksService, TasksGateway],
})
export class TasksModule { }
