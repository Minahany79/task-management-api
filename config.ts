import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: "./.env.local" });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these variables or not setup a .env file at all

interface ENV {
  SERVICE_NAME: string | undefined;
  HOST: string | undefined;
  DEPLOYMENT_HOST: string | undefined;
  PORT: number | undefined;
  BASE_URL: string | undefined;
  NODE_ENV: string | undefined;
  DB_TYPE: string | undefined;
  DB_HOST: string | undefined;
  DB_PORT: number | undefined;
  DB_USERNAME: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_INSTANCE: string | undefined;
  SALT_ROUNDS: number | undefined;
  TOKEN_KEYS_PATH: string | undefined;
  TOKEN_PRIVATE_KEY_NAME: string | undefined;
  TOKEN_PUBLIC_KEY_NAME: string | undefined;
  TOKEN_EXPIRY_DURATION_IN_SECONDS: number | undefined;
  LOGGING_DIRECTORY: string | undefined;
  EXPIRATION_OTP_MINUTES: number | undefined;
}

interface Config {
  SERVICE_NAME: string;
  HOST: string;
  DEPLOYMENT_HOST: string;
  PORT: number;
  BASE_URL: string;
  NODE_ENV: string;
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_INSTANCE: string;
  SALT_ROUNDS: number;
  TOKEN_KEYS_PATH: string;
  TOKEN_PRIVATE_KEY_NAME: string;
  TOKEN_PUBLIC_KEY_NAME: string;
  TOKEN_EXPIRY_DURATION_IN_SECONDS: number;
  COMPANY_NAME: string;
  PRODUCT_NAME: string;
  LOGGING_DIRECTORY: string;
  EXPIRATION_OTP_MINUTES: number;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    SERVICE_NAME: process.env.SERVICE_NAME,
    HOST: process.env.HOST,
    DEPLOYMENT_HOST: process.env.DEPLOYMENT_HOST,
    PORT: parseInt(process.env.PORT || ""),
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT || ""),
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_INSTANCE: process.env.DB_INSTANCE,
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || ""),
    TOKEN_KEYS_PATH: process.env.TOKEN_KEYS_PATH,
    TOKEN_PRIVATE_KEY_NAME: process.env.TOKEN_PRIVATE_KEY_NAME,
    TOKEN_PUBLIC_KEY_NAME: process.env.TOKEN_PUBLIC_KEY_NAME,
    TOKEN_EXPIRY_DURATION_IN_SECONDS: parseInt(process.env.TOKEN_EXPIRY_DURATION_IN_SECONDS || ""),
    LOGGING_DIRECTORY: process.env.LOGGING_DIRECTORY,
    EXPIRATION_OTP_MINUTES: parseInt(process.env.EXPIRATION_OTP_MINUTES || ""),
  };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

export const sanitizedConfig = getSanitizedConfig(config);
