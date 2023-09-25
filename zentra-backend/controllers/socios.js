const db = require("../db/index");

const getSocios = async (req, res, next) => {
  try {
    const socios = await db.query("select * from socios2");
    return res
      .status(200)
      .json({ success: true, data: socios.rows, message: "Socios obtenidos" });
  } catch (error) {
    return next(error);
  }
};

const getSocioId = async (req, res, next) => {
  try {
    const clientId = req.params.id;

    const socioId = await db.query(
      "SELECT * FROM socios2 WHERE ci = $1",
      [clientId]
    );
    return res.status(200).json({
      success: true,
      data: socioId.rows,
      message: "Datos de socio obtenidos",
    });
  } catch (error) {
    console.log("Error al obtener datos de socio:", error);
    return res.status(500).json({
      success: false,
      data: [],
      message: "Error al obtener datos de socio",
    });
  }
};

module.exports = { getSocios, getSocioId };
