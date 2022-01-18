import { AuthDTO } from './../src/auth/dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';

const loginDTO: AuthDTO = {
  login: 'a@a.a',
  password: '123',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('(POST) /auth/login [SUCCESS CASE]', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDTO)
      .expect(200);

    expect(body.accessToken).toBeDefined();
  });

  it('(POST) /review/create [FAIL PASSWORD]', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDTO, password: '2' })
      .expect(401, {
        statusCode: 401,
        message: 'Wrong password',
        error: 'Unauthorized',
      });
  });

  it('(POST) /review/create [FAIL EMAIL]', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDTO, login: '2@2.2' })
      .expect(401, {
        statusCode: 401,
        message: 'User with this email is not found',
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
