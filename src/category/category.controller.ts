import { Controller, Get } from '@nestjs/common';
import { CategoryEntity } from '../entity/category.entity';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<CategoryEntity[]> {
    return this.categoryService.getCategories();
  }
}
