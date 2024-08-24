import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as mssql from 'mssql';
@Injectable()
export class TestService {
  constructor(private _databaseService: DatabaseService) {}

  public async test() {
    return await this._databaseService.executeSql(
      'select * from registrations.UserAccount',
    );
  }
}
