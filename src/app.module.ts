import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TelegramToScrimmageService } from './services/telegram-to-scrimmage.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScrimmageService } from './services/scrimmage.service';
import { TelegramUtilsService } from './services/telegram-utils.service';
import { loadDotEnvConfiguration } from './configurations';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUpdate } from './services/telegram.update';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadDotEnvConfiguration],
      isGlobal: true,
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    TelegramToScrimmageService,
    ScrimmageService,
    TelegramUtilsService,
    TelegramUpdate,
  ],
})
export class AppModule {}
