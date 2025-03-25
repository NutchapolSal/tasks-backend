import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly tasksRepository: typeof Task,
  ) {}

  async getTasksForUser(userId: string) {
    return await this.tasksRepository.findAll({
      where: {
        userId,
      },
    });
  }

  async getTask(taskId: string) {
    return await this.tasksRepository.findByPk(taskId);
  }

  async createTask(userId: string, taskBody: CreateTaskDto) {
    return await this.tasksRepository.create({
      title: taskBody.title,
      description: taskBody.description,
      userId: userId,
    });
  }

  async updateTask(taskId: string, taskBody: UpdateTaskDto) {
    const task = await this.tasksRepository.findByPk(taskId);
    if (!task) {
      return null;
    }
    return await task.update(taskBody);
  }

  async deleteTask(taskId: string) {
    return await this.tasksRepository.destroy({
      where: {
        taskId,
      },
    });
  }
}
