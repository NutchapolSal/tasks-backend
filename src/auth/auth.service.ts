import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  //   async signIn(email: string, rawPassword: string) {
  //     const user = await this.usersService.getUserByEmail(email);
  //     if (user == null) {
  //       throw new UnauthorizedException();
  //     }

  //     const valid = await argon2.verify(user.password, rawPassword);

  //     if (!valid) {
  //       throw new UnauthorizedException();
  //     }

  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { password: _, ...result } = user;
  //     return result;
  //   }

  // TODO: PLACEHOLDER
  signIn(email: string, rawPassword: string) {
    return { id: crypto.randomUUID(), email };
  }
}
