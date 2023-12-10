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
      `SELECT fecha, clase
      FROM horarios
      WHERE fecha >= current_date - interval '1 month' AND fecha <= current_date
      AND (alumno1 = $1 OR alumno2 = $1 OR alumno3 = $1 OR alumno4 = $1 OR alumno5 = $1 OR alumno6 = $1 OR alumno7 = $1 OR alumno8 = $1 OR alumno9 = $1 OR alumno10 = $1 OR alumno11 = $1 OR alumno12 = $1)
      ORDER BY fecha ASC;`,
      [id]
    );

    const horarios = dateConvert(clase.rows.map((row) => row.fecha));
    const clases = clase.rows.map((row)=> row.clase)
    res.status(200).json({
      success: true,
      data: {horarios, clases},
      message: "Horarios obtenidos",
    });
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
    const { new_value, clase_filter, diasemana_filter, hora_filter } = req.body;

    const query = `
    UPDATE horarios h
    SET 
  alumno1 = COALESCE(h.alumno1, $1),
  alumno2 = CASE WHEN h.alumno1 IS NOT NULL AND h.alumno2 IS NULL AND $1 NOT IN (h.alumno1) THEN $1 ELSE h.alumno2 END,
  alumno3 = CASE WHEN h.alumno1 IS NOT NULL AND h.alumno2 IS NOT NULL AND h.alumno3 IS NULL AND $1 NOT IN (h.alumno1, h.alumno2) THEN $1 ELSE h.alumno3 END,
  alumno4 = CASE WHEN h.alumno1 IS NOT NULL AND h.alumno2 IS NOT NULL AND h.alumno3 IS NOT NULL AND h.alumno4 IS NULL AND $1 NOT IN (h.alumno1, h.alumno2, h.alumno3) THEN $1 ELSE h.alumno4 END,
  alumno5 = CASE WHEN h.alumno1 IS NOT NULL AND h.alumno2 IS NOT NULL AND h.alumno3 IS NOT NULL AND h.alumno4 IS NOT NULL AND h.alumno5 IS NULL AND $1 NOT IN (h.alumno1, h.alumno2, h.alumno3, h.alumno4) THEN $1 ELSE h.alumno5 END,
  alumno6 = CASE WHEN h.alumno1 IS NOT NULL AND h.alumno2 IS NOT NULL AND h.alumno3 IS NOT NULL AND h.alumno4 IS NOT NULL AND h.alumno5 IS NOT NULL AND h.alumno6 IS NULL AND $1 NOT IN (h.alumno1, h.alumno2, h.alumno3, h.alumno4, h.alumno5) THEN $1 ELSE h.alumno6 END,
  alumno7 = CASE WHEN h.alumno1 IS NOT NULL AND h.alumno2 IS NOT NULL AND h.alumno3 IS NOT NULL AND h.alumno4 IS NOT NULL AND h.alumno5 IS NOT NULL AND h.alumno6 IS NOT NULL AND h.alumno7 IS NULL AND $1 NOT IN (h.alumno1, h.alumno2, h.alumno3, h.alumno4, h.alumno5, h.alumno6) THEN $1 ELSE h.alumno7 END,
  alumno8 = CASE WHEN h.alumno1 IS NOT NULL AND h.alumno2 IS NOT NULL AND h.alumno3 IS NOT NULL AND h.alumno4 IS NOT NULL AND h.alumno5 IS NOT NULL AND h.alumno6 IS NOT NULL AND h.alumno7 IS NOT NULL AND h.alumno8 IS NULL AND $1 NOT IN (h.alumno1, h.alumno2, h.alumno3, h.alumno4, h.alumno5, h.alumno6, h.alumno7) THEN $1 ELSE h.alumno8 END,
  alumno9 = CASE WHEN h.alumno1 IS NOT NULL AND h.alumno2 IS NOT NULL AND h.alumno3 IS NOT NULL AND h.alumno4 IS NOT NULL AND h.alumno5 IS NOT NULL AND h.alumno6 IS NOT NULL AND h.alumno7 IS NOT NULL AND h.alumno8 IS NOT NULL AND h.alumno9 IS NULL AND $1 NOT IN (h.alumno1, h.alumno2, h.alumno3, h.alumno4, h.alumno5, h.alumno6, h.alumno7, h.alumno8) THEN $1 ELSE h.alumno9 END,
  alumno10 = CASE WHEN h.alumno1 IS NOT NULL AND h.alumno2 IS NOT NULL AND h.alumno3 IS NOT NULL AND h.alumno4 IS NOT NULL AND h.alumno5 IS NOT NULL AND h.alumno6 IS NOT NULL AND h.alumno7 IS NOT NULL AND h.alumno8 IS NOT NULL AND h.alumno9 IS NOT NULL AND h.alumno10 IS NULL AND $1 NOT IN (h.alumno1, h.alumno2, h.alumno3, h.alumno4, h.alumno5, h.alumno6, h.alumno7, h.alumno8, h.alumno9) THEN $1 ELSE h.alumno10 END,
  alumno11 = CASE WHEN h.alumno1 IS NOT NULL AND h.alumno2 IS NOT NULL AND h.alumno3 IS NOT NULL AND h.alumno4 IS NOT NULL AND h.alumno5 IS NOT NULL AND h.alumno6 IS NOT NULL AND h.alumno7 IS NOT NULL AND h.alumno8 IS NOT NULL AND h.alumno9 IS NOT NULL AND h.alumno10 IS NOT NULL AND h.alumno11 IS NULL AND $1 NOT IN (h.alumno1, h.alumno2, h.alumno3, h.alumno4, h.alumno5, h.alumno6, h.alumno7, h.alumno8, h.alumno9, h.alumno10) THEN $1 ELSE h.alumno11 END,
  alumno12 = CASE WHEN h.alumno1 IS NOT NULL AND h.alumno2 IS NOT NULL AND h.alumno3 IS NOT NULL AND h.alumno4 IS NOT NULL AND h.alumno5 IS NOT NULL AND h.alumno6 IS NOT NULL AND h.alumno7 IS NOT NULL AND h.alumno8 IS NOT NULL AND h.alumno9 IS NOT NULL AND h.alumno10 IS NOT NULL AND h.alumno11 IS NOT NULL AND h.alumno12 IS NULL AND $1 NOT IN (h.alumno1, h.alumno2, h.alumno3, h.alumno4, h.alumno5, h.alumno6, h.alumno7, h.alumno8, h.alumno9, h.alumno10, h.alumno11) THEN $1 ELSE h.alumno12 END
    WHERE h.clase = $2
      AND h.diasemana = $3
      AND EXTRACT(HOUR FROM h.fecha) = $4
      AND (h.alumno1 IS NULL OR h.alumno2 IS NULL OR h.alumno3 IS NULL OR h.alumno4 IS NULL OR h.alumno5 IS NULL OR h.alumno6 IS NULL OR h.alumno7 IS NULL OR h.alumno8 IS NULL OR h.alumno9 IS NULL OR h.alumno10 IS NULL OR h.alumno11 IS NULL OR h.alumno12 IS NULL)
      AND NOT EXISTS (
          SELECT 1 FROM horarios h3
          WHERE h3.clase = h.clase
            AND h3.diasemana = h.diasemana
            AND EXTRACT(HOUR FROM h3.fecha) = EXTRACT(HOUR FROM h.fecha)
            AND (alumno2 = $1 OR alumno3 = $1 OR alumno4 = $1 OR alumno5 = $1 OR alumno6 = $1 OR alumno7 = $1 OR alumno8 = $1 OR alumno9 = $1 OR alumno10 = $1 OR alumno11 = $1 OR alumno12 = $1)
      );
      `;

    const response = await db.query(query, [
      new_value,
      clase_filter,
      diasemana_filter,
      hora_filter,
    ]);

    res.status(200).json({
      message: "Alumno actualizado exitosamente",
      data: response.rowCount,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error al actualizar el alumno",
      error: error.message,
    });
  }
};
module.exports = { getClases, eliminarClase, agregarClase, claseSocio };
