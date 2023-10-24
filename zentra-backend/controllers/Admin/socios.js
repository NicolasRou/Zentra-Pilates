const db = require("../../db/index");

const getSocios = async (req, res) => {
  try {
    const { identificador } = req.body;

    const socio = await db.query(
      `SELECT * FROM socios2 WHERE nombre ILIKE '%' || $1 || '%'`,
      [identificador]
    );
    res
      .status(200)
      .json({ success: true, data: socio.rows, message: "Socio obtenido" });
  } catch (error) {
    console.log("No se ha podido acceder a los datos del socio");
  }
};

const editSocio = async (req, res) => {
  try {
    const { ci, fieldsToUpdate } = req.body;

    // Verifica si no se proporcionaron campos para editar
    if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
      return res
        .status(400)
        .json({ message: "Ningún campo para editar proporcionado." });
    }

    const actualizarCampo = [];
    const values = [];

    // Itera a través de los campos y valores proporcionados en fieldsToUpdate
    for (const field in fieldsToUpdate) {
      // Construye una parte de la consulta SQL para cada campo
      actualizarCampo.push(`${field} = $${values.length + 1}`);
      // Agrega el valor correspondiente a la matriz de valores
      values.push(fieldsToUpdate[field]);
    }
    values.push(ci);

    const query = `UPDATE socios2 SET ${actualizarCampo.join(
      ", "
    )} WHERE ci =$${values.length}`;

    await db.query(query, values);

    console.log("CI del Socio:", ci);
    console.log("Campos a Actualizar:", actualizarCampo);
    console.log("Valores a Actualizar:", values);
    console.log(query);

    return res.status(200).json({ message: "Datos actualizados con éxito." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en la actualización del socio." });
  }
};

const deleteSocio = async (req, res) => {
  try {
    const { ci } = req.body;

    const eliminarSocio = await db.query(`DELETE FROM socios2 WHERE ci = $1`, [
      ci,
    ]);
    res
      .status(200)
      .json({ success: true, message: "Socio eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el socio:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al eliminar el socio" });
  }
};

module.exports = {
  getSocios,
  editSocio,
  deleteSocio,
};
