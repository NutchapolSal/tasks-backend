import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('accesstoken')
  async signIn(@Body() authDto: AuthDto) {
    return await this.authService.signIn(authDto.email, authDto.rawPassword);
  }
  @HttpCode(HttpStatus.OK)
  @Post('user')
  async signUp(@Body() authDto: AuthDto) {
    return await this.authService.signUp(authDto.email, authDto.rawPassword);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('accesstoken')
  async getNewAccessToken(@Request() req) {
    return await this.authService.refreshJWT(req.user.sub, req.user.email);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('user')
  async deleteUser(@Request() req) {
    await this.authService.deleteUser(req.user.sub);
  }
}
