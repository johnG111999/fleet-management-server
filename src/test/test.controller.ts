import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { Public } from 'src/guards/public.decorator';

@Controller('test')
export class TestController {
  constructor(private _testService: TestService) {}

  @Get('test')
  @Public()
  getTestData() {
    return this._testService.test();
  }

  @Get('check')
  @Public()
  getCheck(){
    return {test:'some test data'}
  }
}
