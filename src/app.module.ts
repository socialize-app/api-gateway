import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroServicesModule } from './modules/microservices.module';
import { ConfigModule, ConfigService } from 'nest-redis-config';
import { TestModule } from './modules/test.module';
import { DatabaseModule } from '@socialize-app/database';

@Module({
  imports: [
    ConfigModule.forRootAsync(),

    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const url = await configService.get('DATABASE_URL');
        console.warn('url', url);
        return {
          datasources: {
            db: {
              url,
            },
          },
        };
      },
      inject: [ConfigService],
    }),

    MicroServicesModule,
    TestModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
