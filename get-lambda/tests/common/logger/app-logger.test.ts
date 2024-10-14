import { Logger } from "pino";
import AppLogger from "../../../app/common/logger/app-logger";
import ConfigEnv from "../../../app/common/env/config.env";

describe("AppLogger", () => {
  let loggerMock: jest.Mocked<Logger>;
  let appLogger: AppLogger;

  beforeEach(() => {
    loggerMock = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      fatal: jest.fn(),
      trace: jest.fn(),
      child: jest.fn().mockReturnThis(),
    } as any;

    ConfigEnv.values = jest.fn().mockReturnValue({ LOG_ACTIVE: true });
    appLogger = new AppLogger(loggerMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log messages when LOG_ACTIVE is true", () => {
    appLogger.info("Test info message: %s", "test");
    appLogger.error("Test error message: %s", "error");
    appLogger.fatal("Test fatal message: %s", "fatal");
    appLogger.trace("Test trace message: %s", "trace");
    appLogger.warn("Test warn message: %s", "warn");
    appLogger.debug("Test debug message: %s", "debug");

    expect(loggerMock.info).toHaveBeenCalledWith("Test info message: test");
    expect(loggerMock.error).toHaveBeenCalledWith("Test error message: error");
    expect(loggerMock.fatal).toHaveBeenCalledWith("Test fatal message: fatal");
    expect(loggerMock.trace).toHaveBeenCalledWith("Test trace message: trace");
    expect(loggerMock.warn).toHaveBeenCalledWith("Test warn message: warn");
    expect(loggerMock.debug).toHaveBeenCalledWith("Test debug message: debug");
  });

  it("should not log messages when LOG_ACTIVE is false", () => {
    ConfigEnv.values = jest.fn().mockReturnValue({ LOG_ACTIVE: false });
    appLogger = new AppLogger(loggerMock);

    appLogger.info("This should not be logged");
    appLogger.error("This should also not be logged");

    expect(loggerMock.info).not.toHaveBeenCalled();
    expect(loggerMock.error).not.toHaveBeenCalled();
  });

  it("should correctly format messages with multiple arguments", () => {
    appLogger.warn("Warning: %s, Code: %d", "Low disk space", 501);

    expect(loggerMock.warn).toHaveBeenCalledWith(
      "Warning: Low disk space, Code: 501",
    );
  });
});
