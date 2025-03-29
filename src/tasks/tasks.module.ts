import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './entities/tasks.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Task]),
    // for auth.guard
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        signOptions: { expiresIn: '6h' },
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
