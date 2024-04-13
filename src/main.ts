import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerCleanUp } from './utils/startup/logger-cleanup';
import { startup } from './utils/startup';

async function bootstrap() {
  startup();
  const app = await NestFactory.create(AppModule, {
    logger: ['error'],
  });
  await app.listen(3000);
}
bootstrap();
