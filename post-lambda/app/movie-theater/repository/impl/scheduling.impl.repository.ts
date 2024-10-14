import { IDatabase } from "../../../common/database/database";
import ScheduleDto from "../../controller/dto/schedule.dto";
import schedulingQuery from "./query/scheduling.query";
import logger from "../../../common/logger";
import { ResultSetHeader } from "mysql2/promise";
import { SchedulingRepository } from "../scheduling.repository";

export default class SchedulingImplRepository implements SchedulingRepository {
  constructor(private database: IDatabase) {}

  async create(
    movieTheaterId: number,
    peliculaCodigo: number,
    scheduleDto: ScheduleDto,
  ): Promise<number | undefined> {
    logger.info(`SchedulingRepository | create`);
    await this.database.connect();
    try {
      const query: string = schedulingQuery.create;
      const params: unknown[] = [
        movieTheaterId,
        peliculaCodigo,
        scheduleDto.inicio,
        scheduleDto.fin,
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
      logger.error(`SchedulingRepository | create`, error);
    }

    return undefined;
  }
}
