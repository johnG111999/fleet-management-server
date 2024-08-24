import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { Public } from 'src/guards/public.decorator';

@Controller('account')
export class UserAccountController {
    constructor(private _userAccountService:UserAccountService){}

    @Post('create')
    @Public()
    createAccount(@Req() req:any, @Body() body:any){
        return this._userAccountService.createAccount(body);
    }
    
    
}
