import pretty, { PinoPretty } from "pino-pretty";
import pino, { Logger } from "pino";
import ConfigEnv from "../env/config.env";

export default class AppLoggerConfig {
  static logger(): Logger {
    const modeStream = (): PinoPretty.PrettyStream => {
      return pretty({
        sync: true,
        colorize: true,
        translateTime: "SYS:yyyy-mm-dd'T'HH:MM:sso",
        ignore: "pid,hostname",
      });
    };

    return pino(
      {
        level: ConfigEnv.values().LOG_LEVEL,
        formatters: {
          level: (label: string) => ({ level: label.toUpperCase() }),
        },
        timestamp: (): string => `,"timestamp":"${new Date().toISOString()}"`,
      },
      modeStream(),
    ) as Logger;
  }
}
