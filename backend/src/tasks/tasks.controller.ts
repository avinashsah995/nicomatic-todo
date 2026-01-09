import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Prisma } from '@prisma/client';
import { TasksGateway } from './tasks.gateway';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService,
        private readonly tasksGateway: TasksGateway,
    ) { }

    @Post()
    async create(@Body() data: Prisma.TaskCreateInput) {
        const task = await this.tasksService.create(data);
        this.tasksGateway.server.emit('taskCreated', task);
        return task;
    }

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() data: Prisma.TaskUpdateInput) {
        const task = await this.tasksService.update(+id, data);
        this.tasksGateway.server.emit('taskUpdated', task);
        return task;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const task = await this.tasksService.remove(+id);
        this.tasksGateway.server.emit('taskDeleted', task.id);
        return task;
    }
}
