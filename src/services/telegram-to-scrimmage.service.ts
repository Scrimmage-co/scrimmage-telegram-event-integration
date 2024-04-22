import { Injectable, Logger } from '@nestjs/common';
import { ScrimmageService } from './scrimmage.service';
import { TelegramUtilsService } from './telegram-utils.service';
import { ConfigService } from '@nestjs/config';
import { Context } from 'telegraf';
import { Update } from '@telegraf/types/update';

@Injectable()
export class TelegramToScrimmageService {
  private dataTypePrefix;
  private readonly logger = new Logger(TelegramToScrimmageService.name);

  constructor(
    private scrimmageService: ScrimmageService,
    private telegramUtilsService: TelegramUtilsService,
    private configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    this.dataTypePrefix = this.configService.get('SCRIMMAGE_DATA_TYPE_PREFIX');
  }

  async trackMessage(ctx: Context<Update.MessageUpdate>) {
    this.logger.log(
      `Message from ${ctx.message.from?.id} with id ${ctx.message.message_id?.toString()}`,
    );
    this.scrimmageService.trackEvent({
      userId: ctx.message.from?.id?.toString(),
      uniqueId: ctx.message.message_id?.toString(),
      dataType: `${this.dataTypePrefix}TelegramMessageSent`,
      body: {
        ...ctx.message,
      },
    });
  }

  async trackAnyEvent(ctx: Context<any>, eventType: string) {
    this.logger.log(
      `Event ${eventType} from ${ctx.from?.id} with id ${ctx.update.update_id?.toString()}`,
    );
    this.scrimmageService.trackEvent({
      userId: ctx.from?.id?.toString(),
      uniqueId: ctx.update.update_id?.toString(),
      dataType: `${this.dataTypePrefix}${eventType}`,
      body: {
        ...ctx.update,
      },
    });
  }
}
