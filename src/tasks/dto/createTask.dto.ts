import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../TaskStatus';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the task, can be empty',
  })
  description: string;

  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
