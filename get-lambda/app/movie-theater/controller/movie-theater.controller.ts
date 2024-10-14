import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import MovieTheaterService from "../service/movie-theater.service";
import MovieTheaterDto from "./dto/movie-theater.dto";
import UnknownError from "../../common/errors/unknown.error";
import ValidatorPayload from "../../common/validators/validator.payload";
import PayloadError from "../../common/errors/payload.error";
import { HTTP_STATUS } from "../../common/constants/constants";
import logger from "../../common/logger";
import { RequestProps } from "./dto/interfaces/request.props";
import NotFoundError from "../../common/errors/not-found.error";
import CallError from "../../common/errors/call.error";

export class MovieTheaterController {
  constructor(private movieTheaterService: MovieTheaterService) {}

  public async get(
    event: APIGatewayProxyEvent,
  ): Promise<APIGatewayProxyResult> {
    logger.info(`MovieTheaterController | get`);
    try {
      const inputData = new MovieTheaterDto(
        event.pathParameters as unknown as RequestProps,
      );

      await ValidatorPayload.run(inputData);

      const response = await this.movieTheaterService.get(inputData);

      return {
        statusCode: HTTP_STATUS.CODE_200,
        body: JSON.stringify(response),
      };
    } catch (error) {
      if (error instanceof PayloadError ||
          error instanceof NotFoundError ||
          error instanceof CallError) {
        return {
          statusCode: error.httpCode,
          body: JSON.stringify(error.errorBody),
        };
      }

      logger.error(`MovieTheaterController | get | error:`, error);
      return {
        statusCode: HTTP_STATUS.CODE_500,
        body: JSON.stringify((new UnknownError()).errorBody),
      };
    }
  }
}
