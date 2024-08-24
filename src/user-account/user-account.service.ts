import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Account } from './model/account';
import { FirebaseService } from 'src/firebase/firebase.service';
import * as mssql from 'mssql';

@Injectable()
export class UserAccountService {
  constructor(
    private readonly _databaseService: DatabaseService,
    private _firebaseService: FirebaseService,
  ) {}

  public async createAccount(account: Account): Promise<any> {
    const userRecord = await this._firebaseService.createAccount(
      account.emailAddress,
      account.password,
      account.displayName,
      account.phoneNumber,
    );
    if (userRecord) {
      const query = await this._databaseService.executeStoredProcedure(
        '[registrations].[SpCreateUserAccount]',
        [
          {
            name: 'email',
            type: mssql.TYPES.NVarChar,
            value: userRecord.email,
          },
          { name: 'uid', type: mssql.TYPES.NVarChar, value: userRecord.uid },
          {
            name: 'displayName',
            type: mssql.TYPES.NVarChar,
            value: userRecord.displayName,
          },
          {
            name: 'phoneNumber',
            type: mssql.TYPES.NVarChar,
            value: userRecord.phoneNumber,
          },
        ],
      );
      return query.singleResult;
    }
    return undefined;
  }
}
