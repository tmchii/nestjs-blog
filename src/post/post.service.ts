import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity, pickBy } from 'lodash';
import { PostRepository as PostRepository } from '../repository/post.repository';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostEntity } from '../entity/post.entity';
import { CategoryRepository } from '../repository/category.repository';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CategoryEntity } from '../entity/category.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository) private readonly postRepository: PostRepository,
    @InjectRepository(CategoryRepository) private readonly categoryRepository: CategoryRepository,
    private readonly userService: UserService,
  ) {}

  async getPosts(): Promise<PostEntity[]> {
    return this.postRepository.find({ relations: ['user', 'category'] });
  }

  async createPost(username: string, createPostDto: CreatePostDto): Promise<PostEntity> {
    const { categoryId, ...rest } = createPostDto

    const user = await this.userService.findByUsername(username);
    const category = await this.getCategory(categoryId);

    const post = new PostEntity({ ...rest, user, category });
    
    return this.postRepository.save(post);
  }

  async updatePost(_id: string, username: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const {categoryId, ...rest } = updatePostDto;

    let post = await this.findAndValidatePost(_id, username);

    const updateValues = pickBy(rest, identity);

    post = { ...post, ...updateValues, _id }

    if (categoryId) {
      post.category = await this.getCategory(categoryId);
    }

    return this.postRepository.save(post);
  }

  async deletePost(_id: string, username: string): Promise<void> {
    await this.findAndValidatePost(_id, username);
    await this.postRepository.delete(_id);
  }

  private async findAndValidatePost(_id: string, username: string): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ _id }, { relations: ['user'] });

    if (!post) {
      throw new BadRequestException('Post does not exists.')
    }

    if (post.user.username !== username) {
      throw new UnauthorizedException('User is not the owner.');
    }

    return post;
  }

  private async getCategory(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ _id: categoryId });

    if (!category) {
      throw new BadRequestException('Category does not exists.');
    }

    return category;
  }
}
