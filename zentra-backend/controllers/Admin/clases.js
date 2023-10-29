const db = require("../../db/index");
const { dateConvert } = require("../getHorarios");

const getClases = async (req, res, next) => {
  try {
    const { fecha } = req.body;
    const clases = await db.query(
      `SELECT
      h.fecha,
      h.clase,
      s1.ci AS ci_alumno1,
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

    const alumnos = [
      {
        ci: clases.rows[0].ci_alumno1,
        nombre: clases.rows[0].nombre_alumno1,
      },
      {
        ci: clases.rows[0].ci_alumno2,
        nombre: clases.rows[0].nombre_alumno2,
      },
      {
        ci: clases.rows[0].ci_alumno3,
        nombre: clases.rows[0].nombre_alumno3,
      },
    ];

    res.status(200).json({
      success: true,
      data: clases.rows,
      alumnos: alumnos,
      message: "Clases obtenidas",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: "Error al obtener las clases",
    });
  }
};

// Clases del socio en los ultimos 30 dias
const claseSocio = async (req, res) => {
  try {
    const { id } = req.body;
    const clase = await db.query(
      `SELECT fecha
      FROM horarios
      WHERE fecha >= current_date - interval '1 month' AND fecha <= current_date
      AND (alumno1 = $1 OR alumno2 = $1 OR alumno3 = $1)
      ORDER BY fecha ASC;`,
      [id]
    );

    const timeZoneOffset = -3;
    const horarios = dateConvert(
      clase.rows.map((row) => row.fecha),
      timeZoneOffset
    );
    req.setLocale("es");
    res.send(
      res.__res.status(200).json({
        success: true,
        data: horarios,
        message: "Horarios obtenidos",
      })
    );
  } catch (error) {
    console.error("Error en la consulta SQL:", error);
    res.status(500).json({
      success: false,
      data: [],
      message: "Error al obtener clases del socio",
    });
  }
};

const eliminarClase = async (req, res) => {
  try {
    const { id } = req.body;
    const { clase, diasemana } = req.body;

    const eliminar = await db.query(
      `UPDATE horarios
    SET
      alumno1 = CASE
        WHEN alumno1 = $1 THEN null
        ELSE alumno1
      END,
      alumno2 = CASE
        WHEN alumno2 = $1 THEN null
        ELSE alumno2
      END,
      alumno3 = CASE
        WHEN alumno3 = $1 THEN null
        ELSE alumno3
      end
      where clase = $2 and diasemana = $3`,
      [id, clase, diasemana]
    );

    res.status(200).json({
      success: true,
      message: "Alumno eliminado en horario seleccionado",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: "Error al eliminar alumno de la clase",
    });
  }
};

const agregarClase = async (req, res) => {
  try {
    const { clase, dia_semana, hora, nuevo_valor } = req.body;

    const agregar = await db.query(
      `
    SELECT actualizar_alumno($1, $2, $3, $4)
    `,
      [clase, dia_semana, hora, nuevo_valor]
    );

    res.status(200).json({
      message: "Alumno actualizado exitosamente",
      data: agregar.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el alumno",
    });
  }
};

module.exports = { getClases, eliminarClase, agregarClase, claseSocio };
