import { Module } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { UserAccountController } from './user-account.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [UserAccountService],
  controllers: [UserAccountController],
  exports: [UserAccountService],
  imports: [DatabaseModule],
})
export class UserAccountModule {}
