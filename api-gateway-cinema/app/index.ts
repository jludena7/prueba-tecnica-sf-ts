import "reflect-metadata";
import cors from "cors";
import express, { Request, Response } from "express";
import logger from "./src/common/logger";
import {
  ERROR_MESSAGE,
  HTTP_STATUS,
  TAG_ERROR,
} from "./src/common/constants/constants";
import BodyErrorInterface from "./src/common/errors/interfaces/body-error.interface";
import movieTheaterRouter from "./src/movie-theater/routers";
import ConfigEnv from "./src/common/env/config.env";

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  ALLOWED_HEADERS: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/v1", movieTheaterRouter);

app.use((req: Request, res: Response): void => {
  logger.info("Error 404 | url: ", req.url);

  res.status(HTTP_STATUS.CODE_400).json({
    error: TAG_ERROR.ERROR,
    message: ERROR_MESSAGE.NOT_FOUND_ERROR,
  } as BodyErrorInterface);
});

app.use((err: Error, req: Request, res: Response): void => {
  logger.info("Error 500 | Error:", err);

  res.status(HTTP_STATUS.CODE_500).json({
    error: TAG_ERROR.ERROR,
    message: ERROR_MESSAGE.UNKNOWN_ERROR,
  } as BodyErrorInterface);
});

app.listen(ConfigEnv.values().APP_PORT, (): void => {
  logger.info(`App running on http://localhost:${ConfigEnv.values().APP_PORT}`);
});
