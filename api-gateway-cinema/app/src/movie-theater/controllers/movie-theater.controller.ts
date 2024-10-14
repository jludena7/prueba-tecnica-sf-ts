import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { APP_TYPES } from "../types/app.type";
import MovieTheaterService from "../services/movie-theater.service";
import logger from "../../common/logger";
import { default as GetMovieTheaterDto } from "./dto/get/movie-theater.dto";
import { default as CreateMovieTheaterDto } from "./dto/create/movie-theater.dto";
import { RequestProps as GetRequestProps } from "./dto/get/interfaces/request.props";
import { RequestProps as CreateRequestProps } from "./dto/create/interfaces/request.props";
import ValidatorPayload from "../../common/validators/validator.payload";
import { HTTP_STATUS } from "../../common/constants/constants";
import UnknownError from "../../common/errors/unknown.error";
import PayloadError from "../../common/errors/payload.error";
import CallError from "../../common/errors/call.error";

@injectable()
export default class MovieTheaterController {
  constructor(
    @inject(APP_TYPES.MovieTheaterService)
    private movieTheaterService: MovieTheaterService,
  ) {}

  async get(req: Request, res: Response): Promise<void> {
    logger.info(`MovieTheaterController | get`);

    try {
      const inputData = new GetMovieTheaterDto(
        req.params as unknown as GetRequestProps,
      );

      await ValidatorPayload.run(inputData);

      const response = await this.movieTheaterService.get(inputData);

      res.status(response.status);
      res.json(response);
    } catch (error) {
      if (error instanceof PayloadError || error instanceof CallError) {
        res.status(error.httpCode);
        res.json(error.errorBody);
      } else {
        logger.error(`MovieTheaterController | get | error:`, error);

        res.status(HTTP_STATUS.CODE_500);
        res.json(new UnknownError().errorBody);
      }
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    logger.info(`MovieTheaterController | create`);

    try {
      const inputData = new CreateMovieTheaterDto(
        req.body as unknown as CreateRequestProps,
      );

      await ValidatorPayload.run(inputData);

      const response = await this.movieTheaterService.create(inputData);

      res.status(response.status);
      res.json(response);
    } catch (error) {
      if (error instanceof PayloadError) {
        res.status(HTTP_STATUS.CODE_500);
        res.json(error.errorBody);
      } else {
        logger.error(`MovieTheaterController | create | error:`, error);

        res.status(HTTP_STATUS.CODE_500);
        res.json(new UnknownError().errorBody);
      }
    }
  }
}
