import { MoviePremiereEntity } from "./movie-premiere.entity";

export interface MovieTheaterPremiereEntity {
  sala_cine_id: number;
  direccion: string;
  numero_sala: number;
  tipo_sala: string;
  capacidad: number;
  pelicula_estreno: MoviePremiereEntity[];
}
