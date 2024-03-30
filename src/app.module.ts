import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroServicesModule } from './modules/microservices.module';
import { ConfigModule } from 'nest-redis-config';
import { TestModule } from './modules/test.module';

@Module({
  imports: [ConfigModule.forRootAsync(), MicroServicesModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
