import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostEntity } from '../entity/post.entity';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts(): Promise<PostEntity[]> {
    return this.postService.getPosts();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  createPost(@Body() createPostDto: CreatePostDto, @Req() req: any): Promise<PostEntity> {
    return this.postService.createPost(req.user.username, createPostDto);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  updatePost(@Param('id', ParseUUIDPipe) id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: any): Promise<PostEntity> {
    return this.postService.updatePost(id, req.user.username, updatePostDto);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deletePost(@Param('id', ParseUUIDPipe) id: string, @Req() req: any): Promise<void> {
    await this.postService.deletePost(id, req.user.username);
  }
}
