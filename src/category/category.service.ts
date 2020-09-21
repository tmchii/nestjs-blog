import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../repository/category.repository';
import { CategoryEntity } from '../entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository) private readonly categoryRepository: CategoryRepository,
  ) {}

  getCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }
}
