const db = require("../../db/index");

const getClases = async (req, res, next) => {
  try {
    const { fecha } = req.body;
    const clases = await db.query(
      `SELECT
      h.fecha,
      h.clase,
      s1.nombre AS nombre_alumno1,
      s2.nombre AS nombre_alumno2,
      s3.nombre AS nombre_alumno3
  FROM
      horarios AS h
  LEFT JOIN
      socios2 AS s1 ON h.alumno1 = s1.ci
  LEFT JOIN
      socios2 AS s2 ON h.alumno2 = s2.ci
  LEFT JOIN
      socios2 AS s3 ON h.alumno3 = s3.ci
  WHERE
      h.fecha = $1 ;`,
      [fecha]
    );

    if (
      clases.rows[0].nombre_alumno1 === null &&
      clases.rows[0].nombre_alumno2 === null &&
      clases.rows[0].nombre_alumno3 === null
    ) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No hay alumnos agendados para esa clase",
      });
    }

    res
      .status(200)
      .json({ success: true, data: clases.rows, message: "Clases obtenidas" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        data: [],
        message: "Error al obtener las clases",
      });
  }
};

const holasocio = async (req, res) => {
  try {
    const { id } = req.body;

    const getsocio = await db.query(
      `select * from horarios where alumno1 = $1`,
      [id]
    );
    return res.status(200).json({ data: getsocio.rows });
  } catch (error) {}
};

module.exports = { getClases, holasocio };
