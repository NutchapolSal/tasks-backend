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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(@Request() req) {
    return [];
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getTask(@Param('id') id: string, @Request() req) {
    return {
      id,
      title: "that's so cool",
      description: 'now fuck off',
      what: req.user,
    };
  }
  @Post()
  async postTask(@Body() taskBody: CreateTaskDto, @Request() req) {
    return taskBody;
  }
  @Patch(':id')
  async patchTask(
    @Param('id') id: string,
    @Body() taskBody: CreateTaskDto,
    @Request() req,
  ) {
    return taskBody;
  }
  @Delete(':id')
  async deleteTask(@Param('id') id: string, @Request() req) {
    return { id };
  }
}
