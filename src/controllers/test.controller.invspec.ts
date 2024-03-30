import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { TestModule } from '../modules/test.module';
import { ConfigModule } from 'nest-redis-config';
import { MicroServicesModule } from '../modules/microservices.module';
import { catchError, take, throwError, timeout } from 'rxjs';

describe('AppController', () => {
  let appController: TestController;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule.forRootAsync(), MicroServicesModule, TestModule],
      controllers: [TestController],
    }).compile();

    appController = app.get<TestController>(TestController);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('root', () => {
    it('should return "6."', (done) => {
      appController
        .accumulate('1,2,3')
        .pipe(
          take(1),
          timeout(1000), // fail if no value is emitted within 1 second
          catchError((err) => {
            done.fail('Timeout');
            return throwError(err);
          }),
        )
        .subscribe((value) => {
          expect(value).toBe(6);
          done();
        });
    });
  });
});
