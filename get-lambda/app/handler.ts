import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { MovieTheaterController } from "./movie-theater/controller/movie-theater.controller";
import MovieTheaterService from "./movie-theater/service/movie-theater.service";
import { MysqlDatabase } from "./common/database/impl/mysql.database";
import { IDatabase } from "./common/database/database";
import MovieTheaterImplRepository from "./movie-theater/repository/impl/movie-theater.impl.repository";
import FilmImplProvider from "./movie-theater/providers/impl/film.impl.provider";
import { FilmProvider } from "./movie-theater/providers/film.provider";
import { MovieTheaterRepository } from "./movie-theater/repository/movie-theater.repository";
import FilmService from "./movie-theater/service/film.service";
import ConfigEnv from "./common/env/config.env";

//Dependency injection
const database: IDatabase = new MysqlDatabase({
  user: ConfigEnv.values().DB_USER,
  password: ConfigEnv.values().DB_PASSWORD,
  database: ConfigEnv.values().DB_NAME,
  host: ConfigEnv.values().DB_HOST,
  port: ConfigEnv.values().DB_PORT,
});

const filmProvider: FilmProvider = new FilmImplProvider();
const movieTheaterRepository: MovieTheaterRepository =
  new MovieTheaterImplRepository(database);
const filmService: FilmService = new FilmService(filmProvider);
const movieTheaterService = new MovieTheaterService(
  movieTheaterRepository,
  filmService,
);
const movieTheaterController = new MovieTheaterController(movieTheaterService);

export const get = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  return movieTheaterController.get(event);
};
