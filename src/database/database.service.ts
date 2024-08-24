import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mssql from 'mssql';
import { QueryResult } from './model/queryResult';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: mssql.ConnectionPool;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const dbConfig: mssql.config = {
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      server: this.configService.get<string>('DB_SERVER'),
      database: this.configService.get<string>('DB_DATABASE'),
      options: {
        encrypt: true,
        enableArithAbort: true,
      },
    };

    this.pool = new mssql.ConnectionPool(dbConfig);
    await this.pool.connect();
  }

  async onModuleDestroy() {
    await this.pool.close();
  }

  public async executeStoredProcedure(
    spName: string,
    params: { name: string; type: mssql.ISqlType; value: any }[],
  ): Promise<QueryResult> {
    const request = this.pool.request();

    params.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    const result = await request.execute(spName);
    return new QueryResult(result);
  }

  public async executeSql(
    sql: string,
    params: { name: string; type: mssql.ISqlType; value: any }[] = [],
  ): Promise<QueryResult> {
    const request = this.pool.request();

    params.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    //console.log(`Executing SQL: ${sql} with params: ${JSON.stringify(params)}`);

    const result = await request.query(sql);
    return new QueryResult(result);
  }
}
