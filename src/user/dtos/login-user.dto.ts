import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'corrupti' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'dolorum' })
  @IsNotEmpty()
  @IsString()
  password: string;
}