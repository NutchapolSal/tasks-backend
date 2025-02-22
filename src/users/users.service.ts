import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/users.entity';
import { CreateUser } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Customer) private readonly usersRepository: typeof Customer,
  ) {}

  async getUser(idcust: string) {
    return await this.usersRepository.findByPk(idcust);
  }

  async createUser(userBody: CreateUser) {
    return await this.usersRepository.create({
      custname: userBody.custname,
      sex: userBody.sex,
      address: userBody.address,
      tel: userBody.tel,
    });
  }

  async updateUser(userBody: CreateUser & { idcust: string }) {
    const { idcust, ...user } = userBody;
    return await this.usersRepository.update(
      {
        ...user,
      },
      {
        where: {
          idcust,
        },
      },
    );
  }

  async deleteUser(idcust: string) {
    return await this.usersRepository.destroy({
      where: {
        idcust,
      },
    });
  }

  postUser(userBody: any) {
    return userBody;
  }
  putUser(userBody: any) {
    return userBody;
  }
  patchUser(userBody: any) {
    return userBody;
  }
}
