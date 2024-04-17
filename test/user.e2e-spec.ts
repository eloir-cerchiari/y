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
  it('/ (GET)', async () => {
    const responsePost = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Maria',
        email: 'maria@doe.com',
      })
      .expect(201);
    const expected = {
      ...responsePost.body,
      articles: [],
    };
    return request(app.getHttpServer())
      .get('/users/' + responsePost.body.id)
      .expect(200)
      .expect(expected);
  });
});
