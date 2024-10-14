import { FilmColumnEs } from "../adapter/interfaces/film-column-es";

export interface MoviePremiereEntity {
  fecha_hora_inicio: string;
  fecha_hora_fin: string;
  pelicula: FilmColumnEs;
}
