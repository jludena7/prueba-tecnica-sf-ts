import { IsNotEmpty, IsNumberString, ValidateIf } from "class-validator";
import { RequestProps } from "./interfaces/request.props";
import { VALIDATION_MESSAGES } from "../../../../common/messages/errors/validation.message";

export default class MovieTheaterDto {
  @IsNotEmpty({
    message: JSON.stringify(VALIDATION_MESSAGES.IS_NOT_EMPTY("id")),
  })
  @IsNumberString(
    { no_symbols: true },
    {
      message: JSON.stringify(VALIDATION_MESSAGES.IS_NUMBER_STRING("id")),
    },
  )
  @ValidateIf((o) => typeof o.id !== "number")
  id: number;

  constructor(request: RequestProps) {
    this.id = request.id;
  }
}
