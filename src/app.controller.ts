import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configurations';
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

  @Get()
  @Render('index')
  root() {
    return {
      scrimmageApiServerEndpoint: this.configService.get(
        'SCRIMMAGE_API_SERVER_ENDPOINT',
      ),
      authApiUrl: this.configService.get('DOMAIN') + '/api/auth',
    };
  }
}
