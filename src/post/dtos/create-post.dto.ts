import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PostStatusEnum } from '../post.enum';

export class CreatePostDto {
  @ApiProperty({ example: 'aliquid maxime et' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Voluptas odit quasi non aut. Ut minima reiciendis deleniti cupiditate. Laboriosam nobis accusantium. Molestiae aut ducimus quam. Et voluptas maiores earum eum non sit. Consequatur officia aliquid ullam dicta est totam.' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ enum: PostStatusEnum })
  @IsNotEmpty()
  @IsEnum(PostStatusEnum)
  status: PostStatusEnum;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
