import { Module } from '@nestjs/common';
import { MicroServicesModule } from './microservices.module';
import { TestController } from 'src/controllers/test.controller';

@Module({
  imports: [MicroServicesModule],
  controllers: [TestController],
})
export class TestModule {}