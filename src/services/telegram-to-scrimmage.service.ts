import { Injectable, Logger } from '@nestjs/common';
import { ScrimmageService } from './scrimmage.service';
import { Context } from 'telegraf';
import { Update } from '@telegraf/types/update';

@Injectable()
export class TelegramToScrimmageService {
  private readonly logger = new Logger(TelegramToScrimmageService.name);

  constructor(
    private scrimmageService: ScrimmageService,
  ) {}

  async trackMessage(ctx: Context<Update.MessageUpdate>) {
    this.logger.log(
      `Message from ${ctx.message.from?.id} with id ${ctx.message.message_id?.toString()}`,
    );
    this.scrimmageService.trackEvent({
      userId: ctx.message.from?.id?.toString(),
      uniqueId: ctx.message.message_id?.toString(),
      dataType: `TelegramMessageSent`,
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
      dataType: eventType,
      body: {
        ...ctx.update,
      },
    });
  }
}
