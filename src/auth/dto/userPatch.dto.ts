import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserPatchDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'ignored if rawNewPassword is not provided',
  })
  rawOldPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'ignored if rawOldPassword is not provided',
  })
  rawNewPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  email: string;
}
