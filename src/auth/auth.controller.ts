import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { LoginUserDto } from '../user/dtos/login-user.dto';
import { AuthService, LoginResult, RegisterResult } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<RegisterResult> {
    const result = await this.authService.register(dto);

    if (!result.success) {
      throw new BadRequestException(result.message);
    }

    return result;
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<LoginResult> {
    return await this.authService.login(dto)
  }
}
