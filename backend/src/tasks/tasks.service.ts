import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<Task[]> {
        return this.prisma.task.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async create(data: Prisma.TaskCreateInput): Promise<Task> {
        return this.prisma.task.create({ data });
    }

    async update(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
        return this.prisma.task.update({
            where: { id },
            data,
        });
    }

    async remove(id: number): Promise<Task> {
        return this.prisma.task.delete({
            where: { id },
        });
    }
}
