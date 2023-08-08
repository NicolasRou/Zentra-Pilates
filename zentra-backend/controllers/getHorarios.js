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

    return res.status(200).json({
      success: true,
      data: horariosConvertidos,
      message: "Horarios obtenidos",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getHorarios, getHorariosId };
