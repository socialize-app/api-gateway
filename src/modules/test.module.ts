import { Module } from '@nestjs/common';
import { MicroServicesModule } from './microservices.module';
import { TestController } from '../controllers/test.controller';
import { DatabaseModule } from '@socialize-app/database';

@Module({
  imports: [MicroServicesModule],
  providers: [],
  controllers: [TestController],
})
export class TestModule {}
