import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private _testService: TestService) {}
  @Get('test')
  getTestData() {
    return this._testService.test();
  }
}
