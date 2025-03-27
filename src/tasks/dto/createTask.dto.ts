import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../TaskStatus';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
