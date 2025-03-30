import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateTaskDto } from './dto/updateTask.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(@Request() req) {
    return await this.tasksService.getTasksForUser(req.user.sub);
  }

  @Get(':id')
  async getTask(@Param('id') id: string, @Request() req) {
    const task = await this.tasksService.getTask(req.user.sub, id);
    if (task == null) {
      throw new NotFoundException();
    }

    return task;
  }
  @Post()
  async postTask(@Body() taskBody: CreateTaskDto, @Request() req) {
    return await this.tasksService.createTask(req.user.sub, taskBody);
  }
  @Patch(':id')
  async patchTask(
    @Param('id') id: string,
    @Body() taskBody: UpdateTaskDto,
    @Request() req,
  ) {
    const task = await this.tasksService.updateTask(req.user.sub, id, taskBody);
    if (task == null) {
      throw new NotFoundException();
    }
    return task;
  }
  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Request() req) {
    return await this.tasksService.deleteTask(req.user.sub, id);
  }
}
