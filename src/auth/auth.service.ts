import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entity/user.entity';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { LoginUserDto } from '../user/dtos/login-user.dto';
import { UserService } from '../user/user.service';

export type RegisterResult = { success: boolean; message: any };
export type LoginResult = { username: string, accessToken: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, 
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<RegisterResult> {
    try {
      await this.userService.createUser(dto);
      return {
        success: true,
        message: 'user created'
      }
    } catch(error) {
      return {
        success: false,
        message: error,
      }
    }
  }

  async login(dto: LoginUserDto): Promise<LoginResult> {
    const user = await this.userService.findByLogin(dto);

    const accessToken = this.jwtService.sign({ username: dto.username });

    return {
      accessToken,
      username: user.username,
    }
  }

  async validateUser(args: { username: string }): Promise<UserEntity> {
    const user = await this.userService.findByUsername(args.username);

    if (!user) {
      throw new UnauthorizedException('Access token is invalid');
    }

    return user;
  }
}
