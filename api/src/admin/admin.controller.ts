import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { DetailedInfos, Infos } from 'types';

@Controller('admin')
export class AdminController {
  @Inject() adminService: AdminService;

  @Post('login') loginAdmin(@Body('password') password: string) {
    return this.adminService.loginAdmin(password);
  }

  @Get('infos') getInfos(@Query('password') password: string): Infos {
    return this.adminService.getInfos(password);
  }

  @Get('detailedInfos') getDetailedInfos(
    @Query('password') password: string,
    @Query('experimenteeId') experimenteeId: string,
  ): DetailedInfos {
    return this.adminService.getDetailedInfos(password, experimenteeId);
  }
}
