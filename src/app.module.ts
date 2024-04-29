import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TelegramToScrimmageService } from './services/telegram-to-scrimmage.service';
import { ConfigModule } from '@nestjs/config';
import { ScrimmageService } from './services/scrimmage.service';
import { loadDotEnvConfiguration } from './configurations';
import { TelegramService } from './services/telegram.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadDotEnvConfiguration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)'],
    }),
  ],
  controllers: [AppController],
  providers: [TelegramToScrimmageService, ScrimmageService, TelegramService],
})
export class AppModule {}
