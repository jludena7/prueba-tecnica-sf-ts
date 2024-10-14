import ScheduleDto from "../controller/dto/schedule.dto";

export interface SchedulingRepository {
  create(
    movieTheaterId: number,
    peliculaCodigo: number,
    scheduleDto: ScheduleDto,
  ): Promise<number | undefined>;
}
