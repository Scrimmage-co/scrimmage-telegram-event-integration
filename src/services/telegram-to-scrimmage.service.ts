import { Injectable } from '@nestjs/common';
import {Sticker} from "@telegraf/types";

@Injectable()
export class TelegramToScrimmageService {
  // private dataTypePrefix;
  //
  // constructor(
  //   private scrimmageService: ScrimmageService,
  //   private telegramUtilsService: TelegramUtilsService,
  //   private configService: ConfigService,
  // ) {}
  //
  // async onModuleInit(): Promise<void> {
  //   this.dataTypePrefix = this.configService.get('SCRIMMAGE_DATA_TYPE_PREFIX');
  // }
  //
  // async trackMessageReactionAdd(
  //   reaction: any,
  //   user: any,
  // ) {
  //   // User reacted to a message
  //   this.scrimmageService.trackEvent({
  //     userId: await this.telegramUtilsService.getUserId(user),
  //     uniqueId: `${reaction.message.id}::${reaction.emoji.id}`,
  //     dataType: `${this.dataTypePrefix}TelegramMessageReactionAdd`,
  //     body: {
  //       channelName: (reaction.message.channel as any).name,
  //       channelId: reaction.message.channel.id,
  //       guildName: reaction.message.guild.name,
  //       guildId: reaction.message.guild.id,
  //       messageId: reaction.message.id,
  //       messageContent: reaction.message.content,
  //       reaction: reaction.emoji.name,
  //       reactionId: reaction.emoji.id,
  //       reactionCount: reaction.count,
  //       totalReactionsCount: reaction.message.reactions.cache.size,
  //       original: reaction.toJSON(),
  //     },
  //   });
  //   // Message of the user received a reaction
  //   this.scrimmageService.trackEvent({
  //     userId: await this.telegramUtilsService.getUserId(reaction.message.author),
  //     uniqueId: `${reaction.message.id}::${reaction.emoji.id}`,
  //     dataType: `${this.dataTypePrefix}TelegramMessageReactionReceived`,
  //     body: {
  //       channelName: (reaction.message.channel as any).name,
  //       channelId: reaction.message.channel.id,
  //       guildName: reaction.message.guild.name,
  //       guildId: reaction.message.guild.id,
  //       messageId: reaction.message.id,
  //       messageContent: reaction.message.content,
  //       reaction: reaction.emoji.name,
  //       reactionId: reaction.emoji.id,
  //       reactionCount: reaction.count,
  //       totalReactionsCount: reaction.message.reactions.cache.size,
  //       original: reaction.toJSON(),
  //     },
  //   });
  // }
  //
  // async registerUser(user: User) {
  //   return this.scrimmageService.registerUser({
  //     userId: user.id,
  //     username: user.username,
  //     avatar: user.avatar,
  //   });
  // }
  //
  // async trackMessageCreate(message: Message) {
  //   // User sent a message
  //   this.scrimmageService.trackEvent({
  //     userId: await this.telegramUtilsService.getUserId(message.author),
  //     uniqueId: message.id,
  //     dataType: `${this.dataTypePrefix}TelegramMessageSent`,
  //     body: {
  //       isBot: message.author.bot,
  //       isWebhook: message.webhookId !== null,
  //       isSystem: message.system,
  //       isPartial: message.partial,
  //       type: message.type,
  //       typeName: Object.keys(MessageType).find(
  //         key => MessageType[key] === message.type,
  //       ),
  //       channelId: message.channel.id,
  //       channelName: (message.channel as any).name,
  //       guildId: message.guild.id,
  //       guildName: message.guild.name,
  //       content: message.content,
  //       timestamp: message.createdTimestamp,
  //       date: this.telegramUtilsService.createEventDateFromTimestamp(
  //         message.createdTimestamp,
  //       ),
  //       embedsAmount: message.embeds.length,
  //       embedsTypes: message.embeds.map(embed => embed.data.type),
  //       stickersAmount: [...message.stickers.entries()].length,
  //       attachmentsAmount: message.attachments.size,
  //       componentsAmount: message.components.length,
  //       original: message.toJSON(),
  //     },
  //   });
  // }
  //
  // async trackGuildMemberAdd(member: GuildMember) {
  //   // User joined to the server
  //   this.scrimmageService.trackEvent({
  //     userId: await this.telegramUtilsService.getUserId(member.user),
  //     uniqueId: member.user.id,
  //     dataType: `${this.dataTypePrefix}TelegramGuildMemberAdd`,
  //     body: {
  //       guildName: member.guild.name,
  //       guildId: member.guild.id,
  //       joinedTimestamp: member.joinedTimestamp,
  //       joinedDate: await this.telegramUtilsService.createEventDateFromTimestamp(
  //         member.joinedTimestamp,
  //       ),
  //       guildMemberCount: member.guild.memberCount,
  //       nickname: member.nickname,
  //       roleNames: member.roles.cache.map(role => role.name),
  //       roles: member.roles.cache.map(role => role.id),
  //       original: member.toJSON(),
  //     },
  //   });
  // }
  //
  // async trackGuildMemberUpdate(
  //   oldMember: GuildMember | PartialGuildMember,
  //   newMember: GuildMember,
  // ) {
  //   // Role added
  //   if (oldMember.roles.cache.size < newMember.roles.cache.size) {
  //     const addedRole = newMember.roles.cache.find(
  //       role => !oldMember.roles.cache.has(role.id),
  //     );
  //     this.scrimmageService.trackEvent({
  //       userId: await this.telegramUtilsService.getUserId(newMember.user),
  //       uniqueId: newMember.user.id,
  //       dataType: `${this.dataTypePrefix}TelegramGuildMemberRoleAdd`,
  //       body: {
  //         guildName: newMember.guild.name,
  //         guildId: newMember.guild.id,
  //         role: addedRole.name,
  //         roleId: addedRole.id,
  //         original: newMember.toJSON(),
  //       },
  //     });
  //   }
  //   // Role removed
  //   if (oldMember.roles.cache.size > newMember.roles.cache.size) {
  //     const removedRole = oldMember.roles.cache.find(
  //       role => !newMember.roles.cache.has(role.id),
  //     );
  //     this.scrimmageService.trackEvent({
  //       userId: await this.telegramUtilsService.getUserId(newMember.user),
  //       uniqueId: newMember.user.id,
  //       dataType: `${this.dataTypePrefix}TelegramGuildMemberRoleRemove`,
  //       body: {
  //         guildName: newMember.guild.name,
  //         guildId: newMember.guild.id,
  //         role: removedRole.name,
  //         roleId: removedRole.id,
  //         original: newMember.toJSON(),
  //       },
  //     });
  //   }
  //   // Start boosting
  //   if (!oldMember.premiumSince && newMember.premiumSince) {
  //     this.scrimmageService.trackEvent({
  //       userId: await this.telegramUtilsService.getUserId(newMember.user),
  //       uniqueId: newMember.user.id,
  //       dataType: `${this.dataTypePrefix}TelegramGuildMemberBoostStart`,
  //       body: {
  //         guildName: newMember.guild.name,
  //         guildId: newMember.guild.id,
  //         original: newMember.toJSON(),
  //       },
  //     });
  //   }
  //   // Stop boosting
  //   if (oldMember.premiumSince && !newMember.premiumSince) {
  //     this.scrimmageService.trackEvent({
  //       userId: await this.telegramUtilsService.getUserId(newMember.user),
  //       uniqueId: newMember.user.id,
  //       dataType: `${this.dataTypePrefix}TelegramGuildMemberBoostStop`,
  //       body: {
  //         guildName: newMember.guild.name,
  //         guildId: newMember.guild.id,
  //         original: newMember.toJSON(),
  //       },
  //     });
  //   }
  // }
  //
  // async trackGuildMemberRemove(member: GuildMember | PartialGuildMember) {
  //   // User left the server
  //   this.scrimmageService.trackEvent({
  //     userId: await this.telegramUtilsService.getUserId(member.user),
  //     uniqueId: member.user.id,
  //     dataType: `${this.dataTypePrefix}TelegramGuildMemberRemove`,
  //     body: {
  //       guildName: member.guild.name,
  //       guildId: member.guild.id,
  //       original: member.toJSON(),
  //     },
  //   });
  // }
  //
  // async trackThreadCreate(thread: PublicThreadChannel | PrivateThreadChannel) {
  //   // User created a thread
  //   const owner = await thread.fetchOwner();
  //   this.scrimmageService.trackEvent({
  //     userId: await this.telegramUtilsService.getUserId(owner.user),
  //     uniqueId: thread.id,
  //     dataType: `${this.dataTypePrefix}TelegramThreadCreate`,
  //     body: {
  //       guildName: thread.guild.name,
  //       guildId: thread.guild.id,
  //       channelName: (thread as any).name,
  //       channelId: thread.id,
  //       original: thread.toJSON(),
  //     },
  //   });
  // }
  //
  // async trackVoiceStateUpdate(oldState: VoiceState, newState: VoiceState) {
  //   if (
  //     (oldState.channelId !== null && newState.channelId === null) ||
  //     (oldState.channelId !== null &&
  //       newState.channelId !== null &&
  //       oldState.channelId !== newState.channelId)
  //   ) {
  //     this.scrimmageService.trackEvent({
  //       userId: await this.telegramUtilsService.getUserId(newState.member.user),
  //       uniqueId: newState.member.user.id,
  //       dataType: `${this.dataTypePrefix}TelegramVoiceChannelLeave`,
  //       body: {
  //         guildName: newState.guild.name,
  //         guildId: newState.guild.id,
  //         channelId: oldState.channelId,
  //         channelName: oldState.channel.name,
  //         original: newState.toJSON(),
  //       },
  //     });
  //   }
  //   if (
  //     (oldState.channelId === null && newState.channelId !== null) ||
  //     (oldState.channelId !== null &&
  //       newState.channelId !== null &&
  //       oldState.channelId !== newState.channelId)
  //   ) {
  //     this.scrimmageService.trackEvent({
  //       userId: await this.telegramUtilsService.getUserId(newState.member.user),
  //       uniqueId: newState.member.user.id,
  //       dataType: `${this.dataTypePrefix}TelegramVoiceChannelJoin`,
  //       body: {
  //         guildName: newState.guild.name,
  //         guildId: newState.guild.id,
  //         channelId: newState.channel.id,
  //         channelName: (newState.channel as any).name,
  //         original: newState.toJSON(),
  //       },
  //     });
  //   }
  // }
  //
  // async trackGuildScheduledEventUserAdd(
  //   event: GuildScheduledEvent | PartialGuildScheduledEvent,
  //   user: User,
  // ) {
  //   // User joined to the event
  //   this.scrimmageService.trackEvent({
  //     userId: await this.telegramUtilsService.getUserId(user),
  //     uniqueId: user.id,
  //     dataType: `${this.dataTypePrefix}TelegramGuildScheduledEventUserAdd`,
  //     body: {
  //       guildName: event.guild.name,
  //       guildId: event.guild.id,
  //       eventName: event.name,
  //       eventId: event.id,
  //       original: event.toJSON(),
  //     },
  //   });
  // }
  //
  // async trackGuildScheduledEventUserRemove(
  //   event: GuildScheduledEvent | PartialGuildScheduledEvent,
  //   user: User,
  // ) {
  //   // User left the event
  //   this.scrimmageService.trackEvent({
  //     userId: await this.telegramUtilsService.getUserId(user),
  //     uniqueId: user.id,
  //     dataType: `${this.dataTypePrefix}TelegramGuildScheduledEventUserRemove`,
  //     body: {
  //       guildName: event.guild.name,
  //       guildId: event.guild.id,
  //       eventName: event.name,
  //       eventId: event.id,
  //       original: event.toJSON(),
  //     },
  //   });
  // }

  async trackMessage(ctx: any) {
    console.log('Message:', JSON.stringify(ctx));
  }

  async trackMessageReaction(ctx: any) {
    console.log('Reaction:', JSON.stringify(ctx));
  }

  async trackSendSticker(ctx: Sticker) {
    console.log('Sticker:', JSON.stringify(ctx));
  }
}
