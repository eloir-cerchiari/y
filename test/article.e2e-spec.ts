import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', async () => {
    const responsePost = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John',
        email: 'john@doe.com',
      })
      .expect(201);

    expect(responsePost.body.name).toEqual('John');
  });
  it('/ (POST)', async () => {
    const userResponsePost = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'severino',
        email: 'seve@rino.com',
      })
      .expect(201);

    const postArticle = await request(app.getHttpServer())
      .post('/article/' + userResponsePost.body.id)
      .send({
        content: 'new article',
      })
      .expect(201);
    const postArticle2 = await request(app.getHttpServer())
      .post('/article/' + userResponsePost.body.id)
      .send({
        content: 'new article 2',
      })
      .expect(201);

    const userResponseAfterPost = await request(app.getHttpServer()).get(
      '/users/' + userResponsePost.body.id,
    );

    const articles = userResponseAfterPost.body.articles;
    expect(articles.length).toEqual(2);

    expect(articles[0].content).toEqual(postArticle.body.content);
    expect(articles[1].content).toEqual(postArticle2.body.content);
  });
});
