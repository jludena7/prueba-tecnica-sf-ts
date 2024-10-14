import {MovieTheaterRepository} from "../../../app/movie-theater/repository/movie-theater.repository";
import {SchedulingRepository} from "../../../app/movie-theater/repository/scheduling.repository";
import MovieTheaterService from "../../../app/movie-theater/service/movie-theater.service";
import MovieTheaterDto from "../../../app/movie-theater/controller/dto/movie-theater.dto";

describe("MovieTheaterService", () => {
    let movieTheaterRepositoryMock: jest.Mocked<MovieTheaterRepository>;
    let schedulingRepositoryMock: jest.Mocked<SchedulingRepository>;
    let service: MovieTheaterService;

    beforeEach(() => {
        movieTheaterRepositoryMock = {
            create: jest.fn(),
        } as any;

        schedulingRepositoryMock = {
            create: jest.fn(),
        } as any;

        service = new MovieTheaterService(
            movieTheaterRepositoryMock,
            schedulingRepositoryMock
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a movie theater and scheduling", async () => {

        const filmCode = 1;
        const movieTheaterId = 1;
        const inputData = new MovieTheaterDto({
            direccion: "123 Movie St",
            numero_sala: 1,
            tipo_sala: "3D",
            capacidad: 70,
            programacion: [
                {
                    pelicula_codigo: filmCode,
                    horarios: [
                        { inicio: "2024-10-10T12:00:00Z", fin: "2024-10-10T14:00:00Z" },
                        { inicio: "2024-10-10T16:00:00Z", fin: "2024-10-10T18:00:00Z" },
                    ],
                },
            ],
        });

        movieTheaterRepositoryMock.create = jest.fn().mockResolvedValue(movieTheaterId);

        const result = await service.create(inputData);

        expect(movieTheaterRepositoryMock.create).toHaveBeenCalledWith(inputData);
        expect(schedulingRepositoryMock.create).toHaveBeenCalledTimes(2);
        expect(schedulingRepositoryMock.create).toHaveBeenCalledWith(movieTheaterId, filmCode, expect.any(Object));
        expect(result).toEqual({ id: movieTheaterId, ...inputData });
    });

    it("should return the same input data when movie theater creation fails", async () => {

        const inputData: MovieTheaterDto = {
            direccion: "123 Movie St",
            numero_sala: 1,
            tipo_sala: "2D",
            capacidad: 200,
            programacion: [],
        };

        movieTheaterRepositoryMock.create = jest.fn().mockResolvedValue(undefined);

        const result = await service.create(inputData);

        expect(movieTheaterRepositoryMock.create).toHaveBeenCalledWith(inputData);
        expect(schedulingRepositoryMock.create).not.toHaveBeenCalled();
        expect(result).toEqual({ id: undefined, ...inputData });
    });
});
