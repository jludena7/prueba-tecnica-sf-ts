const movieTheaterQuery = {
  create: `INSERT INTO sala_cine (direccion, numero_sala, tipo_sala, capacidad, fecha_creacion) VALUES (?, ?, ?, ?, ?)`,
};

export default movieTheaterQuery;
