export interface DotEnvConfiguration {
  TELEGRAM_TOKEN: string;
  TELEGRAM_ALLOW_REGISTRATION: boolean;
  SCRIMMAGE_API_SERVER_ENDPOINT: string;
  SCRIMMAGE_PRIVATE_KEY: string;
  SCRIMMAGE_NAMESPACE: string;
  SCRIMMAGE_DATA_TYPE_PREFIX: string;
  HOSTNAME: string;
  PORT: number;
  DOMAIN: string;
}

export const loadDotEnvConfiguration = (): DotEnvConfiguration => ({
  TELEGRAM_ALLOW_REGISTRATION:
    process.env.TELEGRAM_ALLOW_REGISTRATION === 'true',
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  SCRIMMAGE_API_SERVER_ENDPOINT: process.env.SCRIMMAGE_API_SERVER_ENDPOINT,
  SCRIMMAGE_DATA_TYPE_PREFIX: process.env.SCRIMMAGE_DATA_TYPE_PREFIX || '',
  SCRIMMAGE_NAMESPACE: process.env.SCRIMMAGE_NAMESPACE,
  SCRIMMAGE_PRIVATE_KEY: process.env.SCRIMMAGE_PRIVATE_KEY,
  HOSTNAME: process.env.HOSTNAME || '0.0.0.0',
  PORT: Number(process.env.PORT) || 3000,
  DOMAIN: process.env.DOMAIN,
});
