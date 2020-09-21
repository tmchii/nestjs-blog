import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { PostStatusEnum } from '../post/post.enum';
import { UserEntity } from './user.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  name: string;

  @Column('enum', { enum: PostStatusEnum })
  status: PostStatusEnum;

  @Column()
  content: string;

  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  constructor(partial: Partial<PostEntity> = {}) {
    Object.assign(this, partial);
  }
}