import CallResponse from "../../common/responses/call.response";
import { FilmColumnEn } from "../adapter/interfaces/film-column-en";

export interface FilmProvider {
  getById(id: number): Promise<CallResponse<FilmColumnEn>>;
}
