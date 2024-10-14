import { MovieTheaterProvider } from "../movie-theater.provider";
import { injectable } from "inversify";
import CallResponse from "../../../common/responses/call.response";
import { default as CreateMovieTheaterDto } from "../../controllers/dto/create/movie-theater.dto";
import logger from "../../../common/logger";
import axios, { AxiosError } from "axios";
import CallError from "../../../common/errors/call.error";
import {
  ERROR_MESSAGE,
  HTTP_STATUS,
} from "../../../common/constants/constants";
import ConfigEnv from "../../../common/env/config.env";

@injectable()
export default class MovieTheaterImplProvider implements MovieTheaterProvider {
  async get(id: number): Promise<CallResponse<object>> {
    logger.info(`MovieTheaterImplProvider | get`);
    try {
      const url = `${ConfigEnv.values().API_MOVIE_THEATER_GET_URL}/${id}`;
      logger.debug(`MovieTheaterImplProvider | get | url:`, url);
      const response = await axios.get(url);
      return new CallResponse<object>(response.status, response.data);
    } catch (error) {
      logger.error(`MovieTheaterImplProvider | get | error:`, error);
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || error.response.statusText;
        throw new CallError(error.response.status, message);
      }

      throw new CallError(HTTP_STATUS.CODE_500, ERROR_MESSAGE.API_CALL_ERROR);
    }
  }

  async create(
    inputData: CreateMovieTheaterDto,
  ): Promise<CallResponse<object>> {
    logger.info(`MovieTheaterImplProvider | create`);
    logger.debug(`MovieTheaterImplProvider | create | inputData`, inputData);
    try {
      const url = `${ConfigEnv.values().API_MOVIE_THEATER_POST_URL}`;
      logger.debug(`MovieTheaterImplProvider | create | url:`, url);
      const response = await axios.post(url, inputData);
      return new CallResponse<object>(response.status, response.data);
    } catch (error) {
      logger.error(`MovieTheaterImplProvider | create | error:`, error);
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message || error.response.statusText;
        throw new CallError(error.response.status, message);
      }

      throw new CallError(HTTP_STATUS.CODE_500, ERROR_MESSAGE.API_CALL_ERROR);
    }
  }
}
