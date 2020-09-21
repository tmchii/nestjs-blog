import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { PostRepository } from './post.repository';
import { UserRepository } from './user.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([
    CategoryRepository, 
    PostRepository, 
    UserRepository
  ])],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}