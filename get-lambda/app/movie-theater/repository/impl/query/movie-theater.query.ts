const movieTheaterQuery = {
  get: `SELECT
              sc.id AS sala_cine_id, sc.direccion, sc.numero_sala, sc.tipo_sala, sc.capacidad,
              p.pelicula_codigo, p.fecha_hora_inicio, p.fecha_hora_fin
        FROM sala_cine sc
        INNER JOIN programacion p ON sc.id = p.sala_cine_id
        WHERE sc.id = ?`,
};

export default movieTheaterQuery;
