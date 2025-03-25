import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks() {
    return [];
  }
  @Get(':id')
  async getTask(@Param('id') id: string) {
    return { id };
  }
  @Post()
  async postTask(@Body() taskBody: CreateTaskDto) {
    return taskBody;
  }
  @Patch(':id')
  async patchTask(@Param('id') id: string, @Body() taskBody: CreateTaskDto) {
    return taskBody;
  }
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return { id };
  }
}
