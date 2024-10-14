const schedulingQuery = {
  create: `INSERT INTO programacion (sala_cine_id, pelicula_codigo, fecha_hora_inicio, fecha_hora_fin, fecha_creacion) VALUES (?, ?, ?, ?, ?)`,
};

export default schedulingQuery;
