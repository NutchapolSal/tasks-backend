import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string) {
    return await argon2.hash(password, {
      // based on https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });
  }

  async signIn(
    email: string,
    rawPassword: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.getUserByEmail(email);
    if (user == null) {
      throw new UnauthorizedException();
    }

    const valid = await argon2.verify(user.password, rawPassword);

    if (!valid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, email: user.email };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async signUp(email: string, rawPassword: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (user != null) {
      throw new UnauthorizedException();
    }
    const hashedPassword = await this.hashPassword(rawPassword);
    const newUser = await this.usersService.createUser(email, hashedPassword);
    const payload = { sub: newUser.userId, email: newUser.email };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async refreshJWT(userId: string, email: string) {
    const user = await this.usersService.getUser(userId);
    if (user == null) {
      throw new UnauthorizedException();
    }

    const payload = { sub: userId, email };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async deleteUser(userId: string) {
    await this.usersService.deleteUser(userId);
  }
}
