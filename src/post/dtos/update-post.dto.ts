import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PostStatusEnum } from '../post.enum';

export class UpdatePostDto {
  @ApiPropertyOptional({ example: 'suscipit similique soluta' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Fuga autem quia sapiente pariatur aut incidunt est impedit. Sapiente quo autem rerum reiciendis dolorum modi rerum. Et soluta beatae iusto vitae dolores. Modi excepturi aut. Voluptates eos doloribus delectus molestias aliquid adipisci sit quo.' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ enum: PostStatusEnum })
  @IsOptional()
  @IsEnum(PostStatusEnum)
  status?: PostStatusEnum;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
