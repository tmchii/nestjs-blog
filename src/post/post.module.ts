import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [AuthModule],
  controllers: [PostController],
  providers: [PostService, UserService]
})
export class PostModule {}
