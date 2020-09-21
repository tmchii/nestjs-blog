import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async findByLogin(dto: LoginUserDto): Promise<UserEntity> {
    const { username, password } = dto;
    
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('User not found.')
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid password.')
    }

    return user;
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ username });

    return user;
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const { username, password } = dto;

    const existedUser = await this.userRepository.findOne({ username })

    if (existedUser) {
      throw new BadRequestException('User already exists.');
    }

    const user = this.userRepository.create({ username, password });
    await this.userRepository.save(user);

    return user;
  }
}
