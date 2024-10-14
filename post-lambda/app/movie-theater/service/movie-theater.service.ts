import MovieTheaterDto from "../controller/dto/movie-theater.dto";
import SchedulingDto from "../controller/dto/scheduling.dto";
import ScheduleDto from "../controller/dto/schedule.dto";
import { MovieTheaterRepository } from "../repository/movie-theater.repository";
import { SchedulingRepository } from "../repository/scheduling.repository";

export default class MovieTheaterService {
  constructor(
    private movieTheaterRepository: MovieTheaterRepository,
    private schedulingRepository: SchedulingRepository,
  ) {}

  public async create(inputData: MovieTheaterDto): Promise<object> {
    const movieTheaterId = await this.movieTheaterRepository.create(inputData);
    if (movieTheaterId) {
      const promiseInsert: Promise<number | undefined>[] = [];

      inputData.programacion.forEach((schedulingDto: SchedulingDto): void => {
        schedulingDto.horarios.forEach((scheduleDto: ScheduleDto): void => {
          promiseInsert.push(
            this.schedulingRepository.create(
              movieTheaterId,
              schedulingDto.pelicula_codigo,
              scheduleDto,
            ),
          );
        });
      });

      await Promise.all(promiseInsert);
    }

    return { id: movieTheaterId, ...inputData };
  }
}
