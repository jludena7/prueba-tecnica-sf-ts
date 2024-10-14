import MovieTheaterService from "../../../app/movie-theater/service/movie-theater.service";
import {MovieTheaterController} from "../../../app/movie-theater/controller/movie-theater.controller";
import {MovieTheaterRepository} from "../../../app/movie-theater/repository/movie-theater.repository";
import {SchedulingRepository} from "../../../app/movie-theater/repository/scheduling.repository";
import {APIGatewayProxyEvent} from "aws-lambda";
import MovieTheaterDto from "../../../app/movie-theater/controller/dto/movie-theater.dto";
import {HTTP_STATUS} from "../../../app/common/constants/constants";
import PayloadError from "../../../app/common/errors/payload.error";
import {VALIDATION_MESSAGES} from "../../../app/common/messages/errors/validation.message";
import UnknownError from "../../../app/common/errors/unknown.error";

describe("MovieTheaterController", () => {
    let movieTheaterRepositoryMock: jest.Mocked<MovieTheaterRepository>;
    let schedulingRepositoryMock: jest.Mocked<SchedulingRepository>;
    let movieTheaterServiceMock: jest.Mocked<MovieTheaterService>;
    let movieTheaterController: MovieTheaterController;

    beforeEach((): void => {
        movieTheaterServiceMock = new MovieTheaterService(
            movieTheaterRepositoryMock, schedulingRepositoryMock
        ) as jest.Mocked<MovieTheaterService>;
        movieTheaterController = new MovieTheaterController(movieTheaterServiceMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 200 and create a new movie theater", async () => {
        const mockResponse = {
            "id": 82,
            "direccion": "Av. Larco",
            "numero_sala": 1,
            "tipo_sala": "3D",
            "capacidad": "70",
            "programacion": [
                {
                    "pelicula_codigo": 1,
                    "horarios": [
                        {
                            "inicio": "2024-10-11T14:30:00",
                            "fin": "2024-10-11T15:30:00"
                        }
                    ]
                }
            ]
        };

        movieTheaterServiceMock.create = jest.fn().mockResolvedValue(mockResponse);

        const payload = {
            "direccion": "Av. Larco",
            "numero_sala": 1,
            "tipo_sala": "3D",
            "capacidad": "70",
            "programacion": [
                {
                    "pelicula_codigo": 1,
                    "horarios": [
                        {
                            "inicio": "2024-10-11T14:30:00",
                            "fin": "2024-10-11T15:30:00"
                        }
                    ]
                }
            ]
        };
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify(payload),
            headers: {},
            httpMethod: "POST",
            isBase64Encoded: false,
            path: "/",
            pathParameters: null,
            queryStringParameters: null,
            stageVariables: null,
            requestContext: null,
            resource: "",
            multiValueHeaders: {},
            multiValueQueryStringParameters: null,
        };

        const result = await movieTheaterController.create(event);

        expect(movieTheaterServiceMock.create).toHaveBeenCalledWith(expect.any(MovieTheaterDto));
        expect(result.statusCode).toBe(HTTP_STATUS.CODE_200);
        expect(result.body).toBe(JSON.stringify(mockResponse));
    });

    it("should return 500 if PayloadError is thrown", async () => {
        const payload = {
            "direccion": "",
            "numero_sala": 1,
            "tipo_sala": "3D",
            "capacidad": "70",
            "programacion": [
                {
                    "pelicula_codigo": 1,
                    "horarios": [
                        {
                            "inicio": "2024-10-11T14:30:00",
                            "fin": "2024-10-11T15:30:00"
                        }
                    ]
                }
            ]
        };
        const event: APIGatewayProxyEvent = {
            body: JSON.stringify(payload),
            headers: {},
            httpMethod: "POST",
            isBase64Encoded: false,
            path: "/",
            pathParameters: null,
            queryStringParameters: null,
            stageVariables: null,
            requestContext: null,
            resource: "",
            multiValueHeaders: {},
            multiValueQueryStringParameters: null,
        };

        const result = await movieTheaterController.create(event);

        expect(result.statusCode).toBe(HTTP_STATUS.CODE_500);
        expect(result.body).toBe(JSON.stringify((new PayloadError(VALIDATION_MESSAGES.IS_NOT_EMPTY("direccion"))).errorBody));
    });

    it("should return 500 if an unknown error is thrown", async () => {
        movieTheaterServiceMock.create = jest.fn().mockRejectedValue(new UnknownError());
        movieTheaterController = new MovieTheaterController(movieTheaterServiceMock);
        const payload = {
            "direccion": "Av. Larco",
            "numero_sala": 1,
            "tipo_sala": "3D",
            "capacidad": "70",
            "programacion": [
                {
                    "pelicula_codigo": 1,
                    "horarios": [
                        {
                            "inicio": "2024-10-11T14:30:00",
                            "fin": "2024-10-11T15:30:00"
                        }
                    ]
                }
            ]
        };

        const event: APIGatewayProxyEvent = {
            body: JSON.stringify(payload),
            headers: {},
            httpMethod: "POST",
            isBase64Encoded: false,
            path: "/",
            pathParameters: null,
            queryStringParameters: null,
            stageVariables: null,
            requestContext: null,
            resource: "",
            multiValueHeaders: {},
            multiValueQueryStringParameters: null,
        };

        const result = await movieTheaterController.create(event);

        expect(result.statusCode).toBe(HTTP_STATUS.CODE_500);
        expect(result.body).toBe(JSON.stringify(new UnknownError().errorBody));
    });

    it("should return 500 if an unknown error is thrown", async () => {
        const event: APIGatewayProxyEvent = {
            body: null,
            headers: {},
            httpMethod: "POST",
            isBase64Encoded: false,
            path: "/",
            pathParameters: null,
            queryStringParameters: null,
            stageVariables: null,
            requestContext: null,
            resource: "",
            multiValueHeaders: {},
            multiValueQueryStringParameters: null,
        };

        const result = await movieTheaterController.create(event);

        expect(result.statusCode).toBe(HTTP_STATUS.CODE_500);
        expect(result.body).toBe(JSON.stringify(VALIDATION_MESSAGES.IS_NOT_EMPTY("direccion")));
    });
});
