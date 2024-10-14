import MovieTheaterDto from "../controller/dto/movie-theater.dto";

export interface MovieTheaterRepository {
  create(inputData: MovieTheaterDto): Promise<number | undefined>;
}
