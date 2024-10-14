import MovieTheaterDto from "../controller/dto/movie-theater.dto";
import { MovieTheaterEntity } from "../entities/movie-theater.entity";

export interface MovieTheaterRepository {
  get(inputData: MovieTheaterDto): Promise<MovieTheaterEntity[]>;
}
