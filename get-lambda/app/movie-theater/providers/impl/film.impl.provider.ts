import { FilmProvider } from "../film.provider";
import axios, { AxiosError } from "axios";
import CallResponse from "../../../common/responses/call.response";
import logger from "../../../common/logger";
import CallError from "../../../common/errors/call.error";
import {
  ERROR_MESSAGE,
  HTTP_STATUS,
} from "../../../common/constants/constants";
import { FilmColumnEn } from "../../adapter/interfaces/film-column-en";
import ConfigEnv from "../../../common/env/config.env";

export default class FilmImplProvider implements FilmProvider {
  private readonly url: string;

  constructor() {
    this.url = `${ConfigEnv.values().API_BASE_URL}/api/films`;
  }

  async getById(id: number): Promise<CallResponse<FilmColumnEn>> {
    logger.info(`FilmsProviderImpl | getById | id`, id);
    try {
      const url = `${this.url}/${id}`;
      logger.debug(`FilmsProviderImpl | getById | url:`, url);
      const response = await axios.get(url);
      return new CallResponse<FilmColumnEn>(response.status, response.data);
    } catch (error) {
      logger.error(`FilmsProviderImpl | getById | error:`, error);
      if (error instanceof AxiosError) {
        throw new CallError(error.response.status, error.response.statusText);
      }

      throw new CallError(HTTP_STATUS.CODE_500, ERROR_MESSAGE.API_CALL_ERROR);
    }
  }
}
