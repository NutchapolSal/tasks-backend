import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly usersRepository: typeof User,
  ) {}

  async getUsers() {
    return await this.usersRepository.findAll();
  }

  async getUser(userId: string) {
    return await this.usersRepository.findByPk(userId);
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(email: string, hashedPassword: string) {
    return await this.usersRepository.create({
      email: email,
      password: hashedPassword,
    });
  }

  async changePassword(userId: string, hashedPassword: string) {
    return await this.usersRepository.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          userId,
        },
      },
    );
  }

  async deleteUser(userId: string) {
    return await this.usersRepository.destroy({
      where: {
        userId,
      },
    });
  }
}
