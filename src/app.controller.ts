import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './guards/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('keepalive')
  @Public()
  keepAlive(@Req() req:any){
    const now = new Date();
    return {timeStamp:now,user:req?.user?.uid};
  }
}
