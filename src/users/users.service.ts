import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/users.entity';
import { CreateUserDto } from '../auth/dto/createUser.dto';
import argon2 from 'argon2';

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

  async createUser(userBody: CreateUserDto) {
    const hashedPassword = await argon2.hash(userBody.rawPassword, {
      // based on https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });
    return await this.usersRepository.create({
      email: userBody.email,
      password: hashedPassword,
    });
  }

  // async updateUser(userBody: CreateUser & { userId: string }) {
  //   const { userId, ...user } = userBody;
  //   return await this.usersRepository.update(
  //     {
  //       ...user,
  //     },
  //     {
  //       where: {
  //         userId,
  //       },
  //     },
  //   );
  // }

  async deleteUser(userId: string) {
    return await this.usersRepository.destroy({
      where: {
        userId,
      },
    });
  }

  // postUser(userBody: any) {
  //   return userBody;
  // }
  // putUser(userBody: any) {
  //   return userBody;
  // }
  // patchUser(userBody: any) {
  //   return userBody;
  // }
}
