const db = require("../db/index");

const dateConvert = (dates, timeZoneOffset) => {
  return dates.map((date) => {
    const fechaObj = new Date(date);
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
};

const formatDate = (dates) => {
  return dates.map((date) => {
    const fechaObj = new Date(date);
    fechaObj.setUTCHours(fechaObj.getUTCHours() - 3);

    const year = fechaObj.getUTCFullYear();
    const month = String(fechaObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(fechaObj.getUTCDate()).padStart(2, "0");
    const hours = String(fechaObj.getUTCHours()).padStart(2, "0");
    const minutes = String(fechaObj.getUTCMinutes()).padStart(2, "0");
    const seconds = String(fechaObj.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(fechaObj.getUTCMilliseconds()).padStart(3, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    return formattedDate;
  });
};

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
      "SELECT fecha FROM prueba2 WHERE ((alumno1 = $1) or (alumno2 = $1) or (alumno3 = $1)) AND fecha BETWEEN $2 AND $3 order by fecha asc",
      [clientId, startDate, endDate]
    );

    const timeZoneOffset = -3;
    const horariosConvertidos = dateConvert(
      horariosId.rows.map((row) => row.fecha),
      timeZoneOffset
    );

    const horariosOriginal = formatDate(
      horariosId.rows.map((row) => row.fecha)
    );

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
    const { diasemana, clase, mes } = req.body;

    const horariosAvailable = await db.query(
      `SELECT *
      FROM prueba2
      WHERE ((alumno1 IS NULL OR alumno1 = '') OR
             (alumno2 IS NULL OR alumno2 = '') OR
             (alumno3 IS NULL OR alumno3 = '')) AND
            clase = $1 AND
            diasemana = $2 AND
            extract(month from fecha) = $3 AND
            fecha >= current_timestamp order by fecha asc`,
      [clase, diasemana, mes]
    );

    const timeZoneOffset = -3;
    const horariosConvertidos = dateConvert(
      horariosAvailable.rows.map((row) => row.fecha),
      timeZoneOffset
    );

    const horariosOriginal = formatDate(
      horariosAvailable.rows.map((row) => row.fecha)
    );

    res.status(200).json({
      success: true,
      data: { converted: horariosConvertidos, original: horariosOriginal },
      message: "Horarios libres obtenidos",
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Hubo un problema al obtener los horarios disponibles." });
  }
};

const viewNextWeekHorarios = async (req, res, next) => {
  try {
    const { clase } = req.body;

    const currentDate = new Date();
    const utcOffset = -3;

    const currentLocalDate = new Date(
      currentDate.getTime() + utcOffset * 60 * 60 * 1000
    );

    const nextWeekStartDate = new Date(currentLocalDate);
    const nextWeekEndDate = new Date(currentLocalDate);

    nextWeekEndDate.setDate(currentLocalDate.getDate() + 7);

    const formattedStartDate = currentLocalDate.toISOString().substr(0, 10);
    const formattedEndDate = nextWeekEndDate.toISOString().substr(0, 10);

    const clasesDisponibles = await db.query(
      `SELECT *
      FROM prueba2
      WHERE ((alumno1 IS NULL OR alumno1 = '') OR
             (alumno2 IS NULL OR alumno2 = '') OR
             (alumno3 IS NULL OR alumno3 = '')) AND
            clase = $1 AND
            fecha >= $2 AND fecha < $3 order by fecha asc`,
      [clase, formattedStartDate, formattedEndDate]
    );

    const timeZoneOffset = -3;
    const horariosConvertidos = dateConvert(
      clasesDisponibles.rows.map((row) => row.fecha),
      timeZoneOffset
    );

    const horariosOriginal = formatDate(
      clasesDisponibles.rows.map((row) => row.fecha)
    );

    res.status(200).json({
      success: true,
      data: {
        original: horariosOriginal,
        converted: horariosConvertidos,
        nextWeekStartDate: formattedStartDate,
        nextWeekEndDate: formattedEndDate,
      },
      message: "Horarios libres de la próxima semana obtenidos",
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Hubo un problema al obtener los horarios disponibles." });
  }
};

const replaceHora = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { clase, horaActual, horaSeleccionada } = req.body;

    await db.query("BEGIN;");

    const updateQuery = `
      UPDATE prueba2
      SET 
        alumno1 = CASE 
          WHEN alumno1 IS NULL THEN $1 
          ELSE alumno1 
        END,
        
        alumno2 = CASE 
          WHEN alumno1 IS NOT NULL AND alumno2 IS NULL THEN $1
          ELSE alumno2 
        END,
        
        alumno3 = CASE 
          WHEN alumno1 IS NOT NULL AND alumno2 IS NOT NULL AND alumno3 IS NULL THEN $1
          ELSE alumno3 
        END
      WHERE clase = $2 AND fecha = $3;
    `;

    await db.query(updateQuery, [id, clase, horaSeleccionada]);

    const nullifyQuery = `
      UPDATE prueba2
      SET 
        alumno1 = CASE 
          WHEN fecha = $1 AND alumno1 = $2 THEN NULL 
          ELSE alumno1 
        END,
        
        alumno2 = CASE 
          WHEN fecha = $1 AND alumno2 = $2 THEN NULL
          ELSE alumno2 
        END,
        
        alumno3 = CASE 
          WHEN fecha = $1 AND alumno3 = $2 THEN NULL
          ELSE alumno3 
        END
      WHERE fecha = $1;
    `;

    await db.query(nullifyQuery, [horaActual, id]);

    await db.query("COMMIT;");
    res.status(200).json({
      success: true,
      data: {
        horarioModificado: horaActual,
        nuevoHorario: horaSeleccionada,
        clase: clase,
      },
      message: "Horario reemplazado y actualizado",
    });

    const response = await replaceHora(req, res);
    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = {
  getHorarios,
  getHorariosId,
  viewHorarios,
  viewNextWeekHorarios,
  replaceHora,
};
