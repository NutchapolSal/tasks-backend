import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './entities/users.entity';

@Module({
  imports: [SequelizeModule.forFeature([Customer])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
