import * as dotenv from "dotenv";

export interface IConfigEnv {
  APP_PORT: string;
  LOG_ACTIVE: boolean;
  LOG_LEVEL: string;
  API_MOVIE_THEATER_GET_URL: string;
  API_MOVIE_THEATER_POST_URL: string;
}

export default class ConfigEnv {
  private static config: IConfigEnv;

  static values(): IConfigEnv {
    if (!this.config) {
      dotenv.config({ path: ".env" });
      this.config = {
        APP_PORT: process.env.APP_PORT,
        LOG_ACTIVE: Boolean(process.env.LOG_ACTIVE),
        LOG_LEVEL: process.env.LOG_LEVEL,
        API_MOVIE_THEATER_GET_URL: process.env.API_MOVIE_THEATER_GET_URL,
        API_MOVIE_THEATER_POST_URL: process.env.API_MOVIE_THEATER_POST_URL,
      } as IConfigEnv;
    }

    return this.config;
  }
}
