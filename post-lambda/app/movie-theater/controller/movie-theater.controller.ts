import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import MovieTheaterService from "../service/movie-theater.service";
import MovieTheaterDto from "./dto/movie-theater.dto";
import UnknownError from "../../common/errors/unknown.error";
import ValidatorPayload from "../../common/validators/validator.payload";
import PayloadError from "../../common/errors/payload.error";
import { HTTP_STATUS } from "../../common/constants/constants";
import logger from "../../common/logger";
import { RequestProps } from "./dto/interfaces/request.props";

export class MovieTheaterController {
  constructor(private movieTheaterService: MovieTheaterService) {}

  public async create(
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> {
    logger.info(`MovieTheaterController | create`);
    try {
      const request = (event.body
        ? JSON.parse(event.body)
        : {}) as unknown as RequestProps;
      const inputData = new MovieTheaterDto(request);

      await ValidatorPayload.run(inputData);

      const response = await this.movieTheaterService.create(inputData);

      return {
        statusCode: HTTP_STATUS.CODE_201,
        body: JSON.stringify(response),
      };
    } catch (error) {
      if (error instanceof PayloadError) {
        return {
          statusCode: HTTP_STATUS.CODE_500,
          body: JSON.stringify(error.errorBody),
        };
      }

      logger.error(`MovieTheaterController | create | error:`, error);
      return {
        statusCode: HTTP_STATUS.CODE_500,
        body: JSON.stringify((new UnknownError()).errorBody),
      };
    }
  }
}
