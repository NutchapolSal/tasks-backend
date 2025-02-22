import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUser(id);
  }
  @Post()
  async postUser(@Body() userBody: CreateUser) {
    // return this.usersService.postUser(userBody);
    return await this.usersService.createUser(userBody);
  }
  @Put()
  async putUser(@Body() userBody: CreateUser & { idcust: string }) {
    return await this.usersService.updateUser(userBody);
  }
  @Patch()
  async patchUser(@Body() userBody) {
    return this.usersService.patchUser(userBody);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
