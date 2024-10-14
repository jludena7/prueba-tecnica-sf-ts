import MovieTheaterService from "../../../app/movie-theater/service/movie-theater.service";
import { MovieTheaterRepository } from "../../../app/movie-theater/repository/movie-theater.repository";
import FilmService from "../../../app/movie-theater/service/film.service";
import MovieTheaterDto from "../../../app/movie-theater/controller/dto/movie-theater.dto";
import { MovieTheaterEntity } from "../../../app/movie-theater/entities/movie-theater.entity";
import { FilmColumnEs } from "../../../app/movie-theater/adapter/interfaces/film-column-es";
import NotFoundError from "../../../app/common/errors/not-found.error";

describe("MovieTheaterService", () => {
  let movieTheaterService: MovieTheaterService;
  let movieTheaterRepository: MovieTheaterRepository;
  let filmService: FilmService;

  beforeEach(() => {
    movieTheaterRepository = {
      get: jest.fn(),
    } as unknown as MovieTheaterRepository;

    filmService = {
      getFilmsByIds: jest.fn(),
    } as unknown as FilmService;

    movieTheaterService = new MovieTheaterService(
      movieTheaterRepository,
      filmService,
    );
  });

  it("should return a MovieTheaterPremiereEntity if movie theater is found", async () => {
    const inputData: MovieTheaterDto = new MovieTheaterDto({
      id: 1,
    });

    const mockMovieTheaterEntity: MovieTheaterEntity[] = [
      {
        sala_cine_id: 1,
        direccion: "Calle Falsa 123",
        numero_sala: 10,
        tipo_sala: "3D",
        capacidad: 100,
        pelicula_codigo: 123,
        fecha_hora_inicio: new Date().toISOString(),
        fecha_hora_fin: new Date().toISOString(),
      },
    ];

    const mockFilmColumnEs: FilmColumnEs[] = [
      {
        titulo: "A New Hope",
        episodio_id: 1,
        resumen: "",
        director: "George Lucas",
        productor: "Gary Kurtz, Rick McCallum",
        fecha_lanzamiento: new Date().toISOString(),
      },
    ];

    (movieTheaterRepository.get as jest.Mock).mockResolvedValue(
      mockMovieTheaterEntity,
    );
    (filmService.getFilmsByIds as jest.Mock).mockResolvedValue(
      mockFilmColumnEs,
    );

    const result = await movieTheaterService.get(inputData);

    expect(result).toEqual({
      sala_cine_id: 1,
      direccion: "Calle Falsa 123",
      numero_sala: 10,
      tipo_sala: "3D",
      capacidad: 100,
      pelicula_estreno: [
        {
          fecha_hora_inicio: mockMovieTheaterEntity[0].fecha_hora_inicio,
          fecha_hora_fin: mockMovieTheaterEntity[0].fecha_hora_fin,
          pelicula: mockFilmColumnEs[0],
        },
      ],
    });
  });

  it("should throw NotFoundError if no movie theater is found", async () => {
    const inputData: MovieTheaterDto = new MovieTheaterDto({
      id: 1,
    });

    (movieTheaterRepository.get as jest.Mock).mockResolvedValue([]);

    await expect(movieTheaterService.get(inputData)).rejects.toThrow(
      new NotFoundError(),
    );
  });
});
