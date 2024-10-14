import { IDatabase } from "../../../common/database/database";
import MovieTheaterDto from "../../controller/dto/movie-theater.dto";
import movieTheaterQuery from "./query/movie-theater.query";
import logger from "../../../common/logger";
import { ResultSetHeader } from "mysql2/promise";
import { MovieTheaterRepository } from "../movie-theater.repository";

export default class MovieTheaterImplRepository
  implements MovieTheaterRepository
{
  constructor(private database: IDatabase) {}

  async create(inputData: MovieTheaterDto): Promise<number | undefined> {
    logger.info(`MovieTheaterRepository | create`);
    await this.database.connect();
    try {
      const query: string = movieTheaterQuery.create;
      const params: unknown[] = [
        inputData.direccion,
        inputData.numero_sala,
        inputData.tipo_sala,
        inputData.capacidad,
        new Date(),
      ];
      const response: ResultSetHeader = await this.database.insert(
        query,
        params,
      );
      if (response.insertId) {
        return response.insertId;
      }
    } catch (error) {
      logger.error(`MovieTheaterRepository | create`, error);
    }

    return undefined;
  }
}
