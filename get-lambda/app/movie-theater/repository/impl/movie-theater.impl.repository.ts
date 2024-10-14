import { IDatabase } from "../../../common/database/database";
import MovieTheaterDto from "../../controller/dto/movie-theater.dto";
import movieTheaterQuery from "./query/movie-theater.query";
import logger from "../../../common/logger";
import { NUMBER } from "../../../common/constants/constants";
import { MovieTheaterRepository } from "../movie-theater.repository";
import { MovieTheaterEntity } from "../../entities/movie-theater.entity";

export default class MovieTheaterImplRepository
  implements MovieTheaterRepository
{
  constructor(private database: IDatabase) {}

  async get(inputData: MovieTheaterDto): Promise<MovieTheaterEntity[]> {
    logger.info(`MovieTheaterRepository | get`);
    await this.database.connect();
    try {
      const query: string = movieTheaterQuery.get;
      const params: unknown[] = [inputData.id];
      const response = await this.database.select<MovieTheaterEntity>(
        query,
        params,
      );
      if (response.length > NUMBER.ZERO) {
        return response as MovieTheaterEntity[];
      }
    } catch (error) {
      logger.error(`MovieTheaterRepository | get`, error);
    }

    return [];
  }
}
