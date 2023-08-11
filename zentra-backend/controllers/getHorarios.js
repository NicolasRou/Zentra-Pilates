const db = require("../db/index");

const getHorarios = async (req, res, next) => {
  try {
    const horarios = await db.query("select * from prueba2");
    return res.status(200).json({
      success: true,
      data: horarios.rows,
      message: "Horarios obtenidos",
    });
  } catch (error) {
    return next(error);
  }
};

const getHorariosId = async (req, res, next) => {
  try {
    const clientId = req.params.id;
    const { startDate, endDate } = req.body;

    const horariosId = await db.query(
      "SELECT fecha FROM prueba2 WHERE alumno1 = $1 AND fecha BETWEEN $2 AND $3",
      [clientId, startDate, endDate]
    );

    const horariosConvertidos = horariosId.rows.map((row) => {
      const fechaUTC = row.fecha;
      const fechaObj = new Date(fechaUTC);
      const options = {
        timeZone: "America/Montevideo",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        weekday: "long",
      };
      const fechaLocal = fechaObj.toLocaleString(undefined, options);
      return fechaLocal;
    });

    const horariosOriginal = horariosId.rows.map((row) => {
      const fechaUTC = row.fecha;
      const fechaObj = new Date(fechaUTC);
      fechaObj.setUTCHours(fechaObj.getUTCHours() - 3);

      const year = fechaObj.getUTCFullYear();
      const month = String(fechaObj.getUTCMonth() + 1).padStart(2, "0");
      const day = String(fechaObj.getUTCDate()).padStart(2, "0");
      const hours = String(fechaObj.getUTCHours()).padStart(2, "0");
      const minutes = String(fechaObj.getUTCMinutes()).padStart(2, "0");
      const seconds = String(fechaObj.getUTCSeconds()).padStart(2, "0");
      const milliseconds = String(fechaObj.getUTCMilliseconds()).padStart(
        3,
        "0"
      );

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

      return formattedDate;
    });

    return res.status(200).json({
      success: true,
      data: {
        original: horariosOriginal,
        converted: horariosConvertidos,
      },
      message: "Horarios obtenidos",
    });
  } catch (error) {
    next(error);
  }
};

const viewHorarios = async (req, res, next) => {
  try {
    const { clase, startDate, endDate, diasemana } = req.body;

    horariosAvailable = await db.query(
      `SELECT fecha
    FROM prueba2
    WHERE (alumno1 IS NULL OR alumno1 = '') OR
          (alumno2 IS NULL OR alumno2 = '') OR
          (alumno3 IS NULL OR alumno3 = '') AND
          clase = $1 AND 
          diasemana = $2 AND
          fecha BETWEEN $3 AND $4`,
      [clase, diasemana, startDate, endDate]
    );

    const results = horariosAvailable.rows;
    res.status(200).json({ results });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Hubo un problema al obtener los horarios disponibles." });
  }
};

module.exports = { getHorarios, getHorariosId, viewHorarios };
