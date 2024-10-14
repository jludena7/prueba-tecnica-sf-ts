import MovieTheaterDto from "../controller/dto/movie-theater.dto";
import { MovieTheaterRepository } from "../repository/movie-theater.repository";
import { MovieTheaterEntity } from "../entities/movie-theater.entity";
import NotFoundError from "../../common/errors/not-found.error";
import { NUMBER } from "../../common/constants/constants";
import { MoviePremiereEntity } from "../entities/movie-premiere.entity";
import { MovieTheaterPremiereEntity } from "../entities/movie-theater-premiere.entity";
import FilmService from "./film.service";
import { FilmColumnEs } from "../adapter/interfaces/film-column-es";

export default class MovieTheaterService {
  constructor(
    private movieTheaterRepository: MovieTheaterRepository,
    private filmService: FilmService,
  ) {}

  public async get(
    inputData: MovieTheaterDto,
  ): Promise<MovieTheaterPremiereEntity> {
    const response: MovieTheaterEntity[] =
      await this.movieTheaterRepository.get(inputData);
    if (response.length < NUMBER.ONE) {
      throw new NotFoundError();
    }

    const filmIds: number[] = response.map(
      (item: MovieTheaterEntity) => item.pelicula_codigo,
    );
    const filmColumnEs: FilmColumnEs[] =
      await this.filmService.getFilmsByIds(filmIds);
    const moviePremiereEntity: MoviePremiereEntity[] = filmColumnEs.map(
      (filmColumnEs: FilmColumnEs): MoviePremiereEntity => {
        return {
          fecha_hora_inicio: response[NUMBER.ZERO].fecha_hora_inicio,
          fecha_hora_fin: response[NUMBER.ZERO].fecha_hora_fin,
          pelicula: filmColumnEs,
        };
      },
    );

    return {
      sala_cine_id: response[NUMBER.ZERO].sala_cine_id,
      direccion: response[NUMBER.ZERO].direccion,
      numero_sala: response[NUMBER.ZERO].numero_sala,
      tipo_sala: response[NUMBER.ZERO].tipo_sala,
      capacidad: response[NUMBER.ZERO].capacidad,
      pelicula_estreno: moviePremiereEntity,
    } as MovieTheaterPremiereEntity;
  }
}
