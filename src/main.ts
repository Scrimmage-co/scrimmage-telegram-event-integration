import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './configurations';
import { TelegramService } from './services/telegram.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Configuration>);
  const requiredEnvs = [
    'TELEGRAM_TOKEN',
    'SCRIMMAGE_API_SERVER_ENDPOINT',
    'SCRIMMAGE_PRIVATE_KEY',
    'SCRIMMAGE_NAMESPACE',
    'DOMAIN',
    'PORT',
  ];
  for (const env of requiredEnvs) {
    if (!configService.get(env as any)) {
      console.error(`Missing required environment variable: ${env}`);
      process.exit(1);
    }
  }
  const telegramService = app.get(TelegramService);
  app.use(await telegramService.startBot());
  await app.listen(configService.get('PORT'), configService.get('HOSTNAME'));
  app.enableShutdownHooks();
}
bootstrap();
