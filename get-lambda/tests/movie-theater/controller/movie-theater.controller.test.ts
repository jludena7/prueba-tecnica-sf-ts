import { APIGatewayProxyEvent } from "aws-lambda";
import MovieTheaterService from "../../../app/movie-theater/service/movie-theater.service";
import {MovieTheaterController} from "../../../app/movie-theater/controller/movie-theater.controller";
import {MovieTheaterRepository} from "../../../app/movie-theater/repository/movie-theater.repository";
import FilmService from "../../../app/movie-theater/service/film.service";
import {ERROR_MESSAGE, HTTP_STATUS, TAG_ERROR} from "../../../app/common/constants/constants";
import UnknownError from "../../../app/common/errors/unknown.error";
import logger from "../../../app/common/logger";
import NotFoundError from "../../../app/common/errors/not-found.error";
import {VALIDATION_MESSAGES} from "../../../app/common/messages/errors/validation.message";

describe("MovieTheaterController", () => {
    let movieTheaterRepositoryMock: jest.Mocked<MovieTheaterRepository>;
    let movieTheaterServiceMock: jest.Mocked<MovieTheaterService>;
    let filmServiceMock: jest.Mocked<FilmService>;
    let controller: MovieTheaterController;
    let mockEvent: APIGatewayProxyEvent;

    beforeEach(() => {
        movieTheaterServiceMock = new MovieTheaterService(movieTheaterRepositoryMock, filmServiceMock) as jest.Mocked<MovieTheaterService>;
        controller = new MovieTheaterController(movieTheaterServiceMock);

        mockEvent = {
            pathParameters: {
                id: "123",
            },
        } as unknown as APIGatewayProxyEvent;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 and the correct response on successful get", async () => {
        const mockResponse = {
            "sala_cine_id": 1,
            "direccion": "Av. Larco",
            "numero_sala": 1,
            "tipo_sala": "3D",
            "capacidad": 70,
            "pelicula_estreno": [
                {
                    "fecha_hora_inicio": "2024-10-11T19:30:00.000Z",
                    "fecha_hora_fin": "2024-10-11T20:30:00.000Z",
                    "pelicula": {
                        "titulo": "A New Hope",
                        "episodio_id": 4,
                        "resumen": "It is a period of civil war.",
                        "director": "George Lucas",
                        "productor": "Gary Kurtz, Rick McCallum",
                        "fecha_lanzamiento": "1977-05-25"
                    }
                }
            ]
        };
        movieTheaterServiceMock.get = jest.fn().mockResolvedValue(mockResponse);

        const result = await controller.get(mockEvent);

        expect(result.statusCode).toBe(HTTP_STATUS.CODE_200);
        expect(result.body).toBe(JSON.stringify(mockResponse));
    });

    it("should return 400 when PayloadError is thrown", async () => {
        mockEvent = {
            pathParameters: {
                id: "",
            },
        } as unknown as APIGatewayProxyEvent;

        const result = await controller.get(mockEvent);

        expect(result.statusCode).toBe(HTTP_STATUS.CODE_400);
        expect(result.body).toBe(JSON.stringify(VALIDATION_MESSAGES.IS_NUMBER_STRING("id")));
    });

    it("should return 404 when NotFoundError is thrown", async () => {
        movieTheaterServiceMock.get = jest.fn().mockRejectedValue(
            new NotFoundError()
        );

        const result = await controller.get(mockEvent);

        expect(result.statusCode).toBe(HTTP_STATUS.CODE_404);
        expect(result.body).toBe(JSON.stringify({
            error: TAG_ERROR.ERROR,
            message: ERROR_MESSAGE.NOT_FOUND_ERROR
        }));
    });

    it("should return 500 when an unknown error occurs", async () => {
        movieTheaterServiceMock.get = jest.fn().mockRejectedValue(new UnknownError().errorBody);

        const result = await controller.get(mockEvent);

        expect(result.statusCode).toBe(HTTP_STATUS.CODE_500);
        expect(result.body).toBe(JSON.stringify(new UnknownError().errorBody));
    });
});
