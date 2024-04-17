import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './user/articles.entity';
import { UserEntity } from './user/user.entity';

import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';

const entities = [UserEntity, ArticleEntity];
@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [UserController, ArticleController],
  providers: [UserService, ArticleService],
})
export class UserModule {}
