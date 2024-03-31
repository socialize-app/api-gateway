import { MicroServiceClient } from 'types/microservices';
import { Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '@socialize-app/database';

@Controller()
export class TestController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userServiceClient: MicroServiceClient,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('sum')
  accumulate(@Query('nums') jNumbers: string): Observable<number> {
    const numbers = jNumbers.split(',').map(Number);
    this.userServiceClient.log('Sending sum request');
    return this.userServiceClient.send<number>({ cmd: 'sum' }, numbers);
  }

  @Post('val')
  async setValue(@Query('key') key: string, @Query('val') val: string) {
    await this.prismaService.user.create({
      data: {
        id: '2',
        name: 'd',
        email: 'd',
        password: 's',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  @Get('val')
  getValue() {
    return this.prismaService.user.findMany();
  }
}
