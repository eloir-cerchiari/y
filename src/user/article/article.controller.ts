import { Body, Controller, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { UserService } from '../user/user.service';
import { ArticleEntity } from '../user/articles.entity';

@Controller('article')
export class ArticleController {
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
  ) {}
  @Post(':idUser')
  async postNewArticle(
    @Body() articleDto: CreateArticleDto,
    @Param('idUser') idUser: string,
  ): Promise<ArticleEntity> {
    const user = await this.userService.getUserById(parseInt(idUser));

    const newArticle = new ArticleEntity();
    newArticle.content = articleDto.content;
    newArticle.user = user;

    return await this.articleService.postNewArticle(newArticle);
  }
}

export type CreateArticleDto = {
  content: string;
};
