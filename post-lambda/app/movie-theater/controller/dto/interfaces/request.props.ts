export interface ScheduleProps {
  inicio: string;

  fin: string;
}

export interface SchedulingProps {
  pelicula_codigo: number;

  horarios: ScheduleProps[];
}

export interface RequestProps {
  direccion: string;

  numero_sala: number;

  tipo_sala: string;

  capacidad: number;

  programacion: SchedulingProps[];
}
