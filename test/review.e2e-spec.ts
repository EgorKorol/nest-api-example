import { AuthDTO } from './../src/auth/dto/auth.dto';
import { REVIEW_ERRORS } from './../src/review/constants';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateReviewDTO } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';

const productId = new Types.ObjectId().toHexString();

const testDTO: CreateReviewDTO = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Описание тестовое',
  rating: 5,
  productId,
};

const loginDTO: AuthDTO = {
  login: 'a@a.a',
  password: '123',
};

describe('ReviewController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDTO);
    token = body.accessToken;
  });

  it('(POST) /review/create [SUCCESS CASE]', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/review/create')
      .set('Authorization', `Bearer ${token}`)
      .send(testDTO)
      .expect(201);

    createdId = body._id;
    expect(createdId).toBeDefined();
  });

  it('(POST) /review/create [FAIL CASE]', () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...testDTO, rating: 0 })
      .expect(400);
  });

  it('(GET) /review/byProduct/:productId [SUCCESS CASE]', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .expect(200);

    expect(body.length).toBe(1);
  });

  it('(GET) /review/byProduct/:productId [FAIL CASE]', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/review/byProduct/' + new Types.ObjectId().toHexString())
      .expect(200);

    expect(body.length).toBe(0);
  });

  it('(DELETE) /review/:id [SUCCESS CASE]', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  it('(DELETE) /review/:id [FAIL CASE]', () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .set('Authorization', `Bearer ${token}`)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_ERRORS.NOT_FOUND,
      });
  });

  afterAll(() => {
    disconnect();
  });
});
