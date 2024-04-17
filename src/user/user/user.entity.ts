import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from './articles.entity';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', default: true })
  isActive: boolean;

  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles: ArticleEntity[];
}
