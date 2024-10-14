import { IsNotEmpty, IsString } from "class-validator";
import { ScheduleProps } from "./interfaces/request.props";
import { VALIDATION_MESSAGES } from "../../../../common/messages/errors/validation.message";

export default class ScheduleDto {
  @IsString({
    message: JSON.stringify(VALIDATION_MESSAGES.IS_STRING("inicio")),
  })
  @IsNotEmpty({
    message: JSON.stringify(VALIDATION_MESSAGES.IS_NOT_EMPTY("inicio")),
  })
  inicio: string;

  @IsString({
    message: JSON.stringify(VALIDATION_MESSAGES.IS_STRING("fin")),
  })
  @IsNotEmpty({
    message: JSON.stringify(VALIDATION_MESSAGES.IS_NOT_EMPTY("fin")),
  })
  fin: string;

  constructor(request: ScheduleProps) {
    this.inicio = request.inicio;
    this.fin = request.fin;
  }
}
