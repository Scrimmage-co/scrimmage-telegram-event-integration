import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configurations';
import * as crypto from 'crypto';
import { ScrimmageService } from './services/scrimmage.service';
import { validate } from './utils/validation';

@Controller()
export class AppController {
  constructor(
    private configService: ConfigService<Configuration>,
    private scrimmageService: ScrimmageService,
  ) {}
  @Post('api/auth')
  async authorizeUser(@Body() body: any) {
    validate(body, this.configService.get('TELEGRAM_TOKEN'));
    const token = await this.scrimmageService.registerUser({
      userId: body.user.id,
      username: body.username,
    });

    return {
      token,
    };
  }
}
