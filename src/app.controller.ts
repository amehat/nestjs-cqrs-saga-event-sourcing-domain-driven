import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }


  @Get('publish/:message')
  public publishEvent(@Param('message') message: string) {
    return this.appService.publishEvent({ message });
  }
}
