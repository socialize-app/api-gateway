import { MicroServiceClient } from 'types/microservices';
import { Module, Logger } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from 'nest-redis-config';

const createMicroserviceProvider = (serviceName: string) => {
  return {
    provide: serviceName,
    useFactory: async (configService: ConfigService) => {
      const port = await configService.get(`${serviceName}_PORT`);
      if (!port) throw new Error(`${serviceName}_PORT is not defined`);

      const logger = new Logger(serviceName);
      logger.debug(`Connecting to ${serviceName} on port ${port}`);

      const client = ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          port,
        },
      });
      // eslint-disable-next-line no-undef
      return new Proxy(client, {
        get(target, prop, reciever) {
          if (prop in logger) return logger[prop].bind(logger);
          return Reflect.get(target, prop, reciever);
        },
      });
    },
    inject: [ConfigService],
  };
};

const SERVICES = ['USER_SERVICE'];
export type MicroService = (typeof SERVICES)[number];
export type MicroServices = { [key in MicroService]: any };

@Module({
  providers: SERVICES.map(createMicroserviceProvider),
  exports: SERVICES,
})
export class MicroServicesModule {}
