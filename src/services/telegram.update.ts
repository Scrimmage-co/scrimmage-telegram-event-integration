import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
import { TelegramToScrimmageService } from './telegram-to-scrimmage.service';
import { Sticker, Message } from '@telegraf/types';

@Update()
export class TelegramUpdate {
  constructor(private telegramToScrimmageService: TelegramToScrimmageService) {}
  @Start()
  async start(@Ctx() ctx: any) {
    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: any) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: Sticker) {
    await this.telegramToScrimmageService.trackSendSticker(ctx);
  }

  @On('message_reaction' as any)
  async onReaction(@Ctx() ctx: any) {
    await this.telegramToScrimmageService.trackMessageReaction(ctx);
  }

  @Hears(/.*/g)
  async hears(@Ctx() ctx: Message) {
    await this.telegramToScrimmageService.trackMessage(ctx);
  }
}
