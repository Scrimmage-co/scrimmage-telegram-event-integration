# Scrimmage - Telegram integration bot

## Description

This repository contains the source code for the Scrimmage Telegram bot.
Scrimmage - Telegram bot that allows you to convert events from you Telegram 
server into Scrimmage events. It is built using NestJS and Telegraf.

## Deployment

### Docker

The easiest way to run the bot is to use Docker. We provide ready to use
images. To run the bot using Docker, you need to have Docker installed.

Run the bot using the following command:

```bash
docker run \
 -e TELEGRAM_TOKEN=<your_telegram_token> \
 -e SCRIMMAGE_API_SERVER_ENDPOINT=<your_scrimmage_api_server_endpoint> \
 -e SCRIMMAGE_PRIVATE_KEY=<your_scrimmage_private_key> \
 -e SCRIMMAGE_NAMESPACE=<your_scrimmage_namespace> \
 -e DOMAIN=<your_DOMAIN> \
 -e PORT=<your_PORT> \
 -p <your_PORT>:<your_PORT> \
 public.ecr.aws/u8g2k1e9/scrimmage-telegram-event-integration:1.1.1
```

All listed environment variables are required. You can find more information
about them in the [Configuration](#configuration) section.

### Custom

You can also run the bot without Docker. To do so, you need to have Node.js
installed. You can find more information about installing Node.js
[here](https://nodejs.org/en/download/).

To run the bot, you need to install dependencies first:

```bash
npm install
```

Then, you can build the bot:

```bash
npm run build
```

Finally, you can run the bot:

```bash
node dist/main.js
```

## Telegram bot token

To run the bot, you need to have a Telegram bot token. You can find more
information about Telegram bot tokens
[here](https://core.telegram.org/bots/tutorial).

After you have created a Telegram bot, you need to add it to your Telegram
server.

We recommend using the following permissions for the bot:

- Administrator (for now, we will reduce the required permissions in the future)


## Setting up widget
You can allow your telegram users to open Scrimmage widget right in the telegram chat. To do so, you need to
set up the domain of the server in the environment variable `DOMAIN`. The widget will be
available at `https://<your_domain>/`.

Then you need to allow your users to open the widget using the bot. There are a couple of ways to do it. 
The easiest way is adding widget to the menu - https://core.telegram.org/bots/webapps#launching-mini-apps-from-the-menu-button

To read more about Telegram Mini Apps, you can visit documentation [here](https://core.telegram.org/bots/webapps#webappchat).

## Configuration

The bot can be configured using environment variables. The following
environment variables are available:

| Name                            | Description                                            | Required |
|---------------------------------|--------------------------------------------------------|----------|
| `TELEGRAM_TOKEN`                | Telegram bot token (see [here](#telegram-bot-token))   | Yes      |
| `DOMAIN`                        | The Domain where your bot will be deployed             | No       |
| `PORT`                          | Port on which you wil receive events from Telegram     | No       |
| `SCRIMMAGE_API_SERVER_ENDPOINT` | Scrimmage API server endpoint                          | Yes      |
| `SCRIMMAGE_PRIVATE_KEY`         | Scrimmage private key                                  | Yes      |
| `SCRIMMAGE_NAMESPACE`           | Scrimmage namespace                                    | Yes      |
| `SCRIMMAGE_DATA_TYPE_PREFIX`    | Scrimmage data type prefix                             | No       |
| `PORT`                          | Port on which the bot will listen (default: `3000`)    | No       |
| `HOSTNAME`                      | Host on which the bot will listen (default: `0.0.0.0`) | No       |


## Development

### Dependencies

To install dependencies, run the following command:

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stay in touch

- Author - [Scrimmage Team](founders@scrimmage.co)
- Website - [https://scrimmage.co](https://scrimmage.co/)
