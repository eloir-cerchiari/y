import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({
  name: 'article',
})
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int', default: 0 })
  upvotes: number;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  user: UserEntity;
}
