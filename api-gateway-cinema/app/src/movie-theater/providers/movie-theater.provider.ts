import CallResponse from "../../common/responses/call.response";
import { default as createMovieTheaterDto } from "../controllers/dto/create/movie-theater.dto";

export interface MovieTheaterProvider {
  get(id: number): Promise<CallResponse<object>>;

  create(inputData: createMovieTheaterDto): Promise<CallResponse<object>>;
}
