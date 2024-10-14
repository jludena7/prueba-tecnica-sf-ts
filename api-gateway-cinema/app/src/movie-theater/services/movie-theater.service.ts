import { default as GetMovieTheaterDto } from "../controllers/dto/get/movie-theater.dto";
import { default as createMovieTheaterDto } from "../controllers/dto/create/movie-theater.dto";
import CallResponse from "../../common/responses/call.response";
import { inject, injectable } from "inversify";
import { APP_TYPES } from "../types/app.type";
import { MovieTheaterProvider } from "../providers/movie-theater.provider";

@injectable()
export default class MovieTheaterService {
  constructor(
    @inject(APP_TYPES.MovieTheaterProvider)
    private movieTheaterProvider: MovieTheaterProvider,
  ) {}

  async get(inputData: GetMovieTheaterDto): Promise<CallResponse<object>> {
    return this.movieTheaterProvider.get(inputData.id);
  }

  async create(
    inputData: createMovieTheaterDto,
  ): Promise<CallResponse<object>> {
    return this.movieTheaterProvider.create(inputData);
  }
}
