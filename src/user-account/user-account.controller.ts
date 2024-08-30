import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
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

    @Get('lookup/:emailAddress')
    @Public()
    lookupAccount(@Req() req:any, @Param('emailAddress') emailAddress:string){
        return this._userAccountService.accountLookup(emailAddress);
    }

    @Get('getaccount/:uid')
    getAccount(@Req() req:any, @Param('uid') uid:string){
        return this._userAccountService.getAccount(uid);
    }


    
    
}
