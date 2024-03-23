import { Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export type MicroServiceClient = ClientProxy & Logger;
