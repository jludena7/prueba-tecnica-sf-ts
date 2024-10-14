import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { MovieTheaterController } from "./movie-theater/controller/movie-theater.controller";
import MovieTheaterService from "./movie-theater/service/movie-theater.service";
import { MysqlDatabase } from "./common/database/impl/mysql.database";
import { IDatabase } from "./common/database/database";
import MovieTheaterImplRepository from "./movie-theater/repository/impl/movie-theater.impl.repository";
import SchedulingImplRepository from "./movie-theater/repository/impl/scheduling.impl.repository";
import { MovieTheaterRepository } from "./movie-theater/repository/movie-theater.repository";
import { SchedulingRepository } from "./movie-theater/repository/scheduling.repository";
import ConfigEnv from "./common/env/config.env";

//Dependency injection
const database: IDatabase = new MysqlDatabase({
  user: ConfigEnv.values().DB_USER,
  password: ConfigEnv.values().DB_PASSWORD,
  database: ConfigEnv.values().DB_NAME,
  host: ConfigEnv.values().DB_HOST,
  port: Number(ConfigEnv.values().DB_PORT),
});

const movieTheaterRepository: MovieTheaterRepository =
  new MovieTheaterImplRepository(database);
const schedulingRepository: SchedulingRepository = new SchedulingImplRepository(
  database,
);
const movieTheaterService = new MovieTheaterService(
  movieTheaterRepository,
  schedulingRepository,
);
const movieTheaterController = new MovieTheaterController(movieTheaterService);

export const create = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  return movieTheaterController.create(event);
};
