import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegramToScrimmageService } from './telegram-to-scrimmage.service';
import { Configuration } from '../configurations';
import { Composer, Context, Telegraf } from 'telegraf';
import { Update } from '@telegraf/types/update';
import { UpdateType } from 'telegraf/typings/telegram-types';

const eventTypes = [
  'sticker',
  'animation',
  'audio',
  'document',
  'photo',
  'video',
  'video_note',
  'voice',
  'channel_post',
  'chat_member',
  'chosen_inline_result',
  'edited_channel_post',
  'edited_message',
  'inline_query',
  'message',
  'my_chat_member',
  'pre_checkout_query',
  'poll_answer',
  'poll',
  'shipping_query',
  'chat_join_request',
  'chat_boost',
  'removed_chat_boost',
  'has_media_spoiler',
  'contact',
  'dice',
  'location',
  'new_chat_members',
  'left_chat_member',
  'new_chat_title',
  'new_chat_photo',
  'delete_chat_photo',
  'group_chat_created',
  'supergroup_chat_created',
  'channel_chat_created',
  'message_auto_delete_timer_changed',
  'migrate_to_chat_id',
  'migrate_from_chat_id',
  'pinned_message',
  'invoice',
  'successful_payment',
  'users_shared',
  'chat_shared',
  'connected_website',
  'write_access_allowed',
  'passport_data',
  'proximity_alert_triggered',
  'boost_added',
  'forum_topic_created',
  'forum_topic_edited',
  'forum_topic_closed',
  'forum_topic_reopened',
  'general_forum_topic_hidden',
  'general_forum_topic_unhidden',
  'giveaway_created',
  'giveaway',
  'giveaway_winners',
  'giveaway_completed',
  'video_chat_scheduled',
  'video_chat_started',
  'video_chat_ended',
  'video_chat_participants_invited',
  'web_app_data',
  'game',
  'story',
  'venue',
  'forward_date',
  'message_reaction',
  'callback_query',
] as UpdateType[];

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);
  private client: Telegraf;

  constructor(
    private configService: ConfigService<Configuration>,
    private telegramToScrimmageService: TelegramToScrimmageService,
  ) {}

  async onModuleInit(): Promise<void> {
    this.client = this.createTelegraf();
    this.addListeners(this.client);
    await this.client.launch({
      webhook: {
        domain: this.configService.get('WEBHOOK_DOMAIN'),
        port: this.configService.get('WEBHOOK_PORT'),
      },
    });
    this.client.webhookCallback(
      '/bot' + this.configService.get('TELEGRAM_TOKEN'),
    );
  }

  private addListeners(client: Telegraf) {
    this.addErrorHandler(client);
    this.addMessageListener(client);

    eventTypes.forEach(eventType => {
      this.client.use(
        Composer.on(eventType, async (ctx: Context) => {
          await this.telegramToScrimmageService.trackAnyEvent(ctx, eventType);
        }),
      );
    });
  }

  private createTelegraf(): Telegraf {
    return new Telegraf(this.configService.get('TELEGRAM_TOKEN'));
  }

  private addMessageListener(client: Telegraf) {
    client.hears(/.*/g, async (ctx: Context<Update.MessageUpdate>) => {
      await this.telegramToScrimmageService.trackMessage(ctx);
    });
  }

  private addErrorHandler(client: Telegraf) {
    client.catch((err, ctx) => {
      this.logger.error(`Error for ${ctx.updateType}`, err);
    });
  }
}
