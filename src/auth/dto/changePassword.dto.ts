import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  rawOldPassword: string;

  @IsString()
  @IsNotEmpty()
  rawNewPassword: string;
}
