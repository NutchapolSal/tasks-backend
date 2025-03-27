import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/users.entity';
import { TaskStatus } from '../TaskStatus';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Table({
  tableName: 'task',
})
export class Task extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  taskId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  title: string;

  @Column(DataType.TEXT)
  @ApiPropertyOptional()
  description: string;

  @Column({
    type: DataType.ENUM(...Object.values(TaskStatus)),
    defaultValue: TaskStatus.PENDING,
    allowNull: false,
  })
  status: TaskStatus;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;
}
