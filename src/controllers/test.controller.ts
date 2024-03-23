import { MicroServiceClient } from '@@/types/microservices';
import { Controller, Get, Inject, Logger, Param, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class TestController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userServiceClient: MicroServiceClient,
  ) {}

  @Get('sum')
  accumulate(@Query('nums') jNumbers: string): Observable<number> {
    console.log('Param:', jNumbers);
    const numbers = jNumbers.split(',').map(Number);
    this.userServiceClient.log('Sending sum request');
    return this.userServiceClient.send<number>({ cmd: 'sum' }, numbers);
  }
}
