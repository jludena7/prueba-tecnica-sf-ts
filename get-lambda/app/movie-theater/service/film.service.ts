import { FilmProvider } from "../providers/film.provider";
import CallResponse from "../../common/responses/call.response";
import { FilmColumnEn } from "../adapter/interfaces/film-column-en";
import FilmAdapter from "../adapter/film.adapter";
import { FilmColumnEs } from "../adapter/interfaces/film-column-es";

export default class FilmService {
  constructor(private filmProvider: FilmProvider) {}

  async getFilmsByIds(filmIds: number[]): Promise<FilmColumnEs[]> {
    const callApis: Promise<CallResponse<FilmColumnEn>>[] = [];
    filmIds.forEach((filmId: number): void => {
      callApis.push(this.filmProvider.getById(filmId));
    });

    const results = await Promise.all(callApis);
    return results.map(
      (callResponse: CallResponse<FilmColumnEn>): FilmColumnEs => {
        const filmAdapter = new FilmAdapter(callResponse.data);
        return filmAdapter.adapt();
      },
    ) as FilmColumnEs[];
  }
}
