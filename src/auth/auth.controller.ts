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
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserPatchDto } from './dto/userPatch.dto';

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
    return await this.authService.refreshJWT(
      req.user.sub,
      req.user.email,
      req.user.issuedAt,
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('accesstoken')
  async clearAllSessions(@Request() req) {
    return await this.authService.clearAllSessions(
      req.user.sub,
      req.user.issuedAt,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('user')
  async deleteUser(@Request() req) {
    await this.authService.deleteUser(req.user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('user')
  async patchUser(@Request() req, @Body() dto: UserPatchDto) {
    if (dto.rawOldPassword != null && dto.rawNewPassword != null) {
      await this.authService.changePassword(
        req.user.sub,
        req.user.issuedAt,
        dto.rawOldPassword,
        dto.rawNewPassword,
      );
    }

    if (dto.email != null) {
      await this.authService.changeEmail(
        req.user.sub,
        req.user.issuedAt,
        dto.email,
      );
    }
  }
}
