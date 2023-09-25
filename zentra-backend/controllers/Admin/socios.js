const db = require("../../db/index");

const getSocios = async (req, res) => {
  try {
    const { identificador } = req.body;

    const socio = await db.query(
      `SELECT * FROM socios2 where nombre = $1 or ci = $1`,
      [identificador]
    );
    res
      .status(200)
      .json({ success: true, data: socio.rows, message: "Socio obtenido" });
  } catch (error) {
    console.log("No se ha podido acceder a los datos del socio");
  }
};

const editNombre = async (req, res) => {
  try {
    const { nombre, ci } = req.body;

    const socioNombre = await db.query(
      `UPDATE socios2 SET nombre = $1 WHERE ci = $2`,
      [nombre, ci]
    );

    res.status(200).json({
      success: true,
      data: socioNombre.rows,
      message: "Nombre modificado",
    });
  } catch (error) {
    console.log("No se ha podido modificar el socio");
  }
};

const editPass = async (req, res) => {
  try {
    const { pass, ci } = req.body;

    const socioPass = await db.query(
      `UPDATE socios2 SET pass = $1 WHERE ci = $2`,
      [pass, ci]
    );

    res.status(200).json({
      success: true,
      data: socioPass.rows,
      message: "Pass modificado",
    });
  } catch (error) {
    console.log("No se ha podido modificar el socio");
  }
};

const editMail = async (req, res) => {
  try {
    const { mail, ci } = req.body;

    const socioMail = await db.query(
      `UPDATE socios2 SET mail = $1 WHERE ci = $2`,
      [mail, ci]
    );

    res.status(200).json({
      success: true,
      data: socioMail.rows,
      message: "Mail modificado",
    });
  } catch (error) {
    console.log("No se ha podido modificar el socio");
  }
};

const editSociedad = async (req, res) => {
  try {
    const { sociedad, ci } = req.body;

    const socioSociedad = await db.query(
      `UPDATE socios2 SET sociedad = $1 WHERE ci = $2`,
      [sociedad, ci]
    );

    res.status(200).json({
      success: true,
      data: socioSociedad.rows,
      message: "Dato sociedad modificada",
    });
  } catch (error) {
    console.log("No se ha podido modificar el socio");
  }
};

const editPatologias = async (req, res) => {
  try {
    const { patologias, ci } = req.body;

    const socioPatologias = await db.query(
      `UPDATE socios2 SET patologias = $1 WHERE ci = $2`,
      [patologias, ci]
    );

    res.status(200).json({
      success: true,
      data: socioPatologias.rows,
      message: "Dato patologias modificada",
    });
  } catch (error) {
    console.log("No se ha podido modificar el socio");
  }
};

const editConsideraciones = async (req, res) => {
  try {
    const { consideraciones, ci } = req.body;

    const socioCons = await db.query(
      `UPDATE socios2 SET consideraciones = $1 WHERE ci = $2`,
      [consideraciones, ci]
    );

    res.status(200).json({
      success: true,
      data: socioCons.rows,
      message: "Dato consideraciones modificadas",
    });
  } catch (error) {
    console.log("No se ha podido modificar el socio");
  }
};

const editPlan = async (req, res) => {
  try {
    const { plan, ci } = req.body;

    const socioPlan = await db.query(
      `UPDATE socios2 SET plan = $1 WHERE ci = $2`,
      [plan, ci]
    );

    res.status(200).json({
      success: true,
      data: socioPlan.rows,
      message: "Plan modificado",
    });
  } catch (error) {
    console.log("No se ha podido modificar el socio");
  }
};

const editEmbarazo = async (req, res) => {
  try {
    const { embarazo, ci } = req.body;

    const socioEmbarazo = await db.query(
      `UPDATE socios2 SET embarazo = $1 WHERE ci = $2`,
      [embarazo, ci]
    );

    res.status(200).json({
      success: true,
      data: socioEmbarazo.rows,
      message: "Dato embarazo modificado",
    });
  } catch (error) {
    console.log("No se ha podido modificar el socio");
  }
};

const editCuponera = async (req, res) => {
  try {
    const { cuponera, ci } = req.body;

    const socioCuponera = await db.query(
      `UPDATE socios2 SET cuponera = $1 WHERE ci = $2`,
      [cuponera, ci]
    );

    res.status(200).json({
      success: true,
      data: socioCuponera.rows,
      message: "Cantidad de cuponera modificada",
    });
  } catch (error) {
    console.log("No se ha podido modificar el socio");
  }
};

const editContacto = async (req, res) => {
  try {
    const { contacto, ci } = req.body;

    const socioContacto = await db.query(
      `UPDATE socios2 SET contacto = $1 WHERE ci = $2`,
      [contacto, ci]
    );

    res.status(200).json({
      success: true,
      data: socioContacto.rows,
      message: "Contacto modificado",
    });
  } catch (error) {
    console.log("No se ha podido modificar el socio");
  }
};

const editComentarios = async (req, res) => {
  try {
    const { comentario, ci } = req.body;

    const socioComment = await db.query(
      `UPDATE socios2 SET comentario = $1 WHERE ci = $2`,
      [comentario, ci]
    );

    res.status(200).json({
      success: true,
      data: socioComment.rows,
      message: "Comentario modificado",
    });
  } catch (error) {
    console.log("No se ha podido modificar el socio");
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
  editNombre,
  editMail,
  editComentarios,
  editConsideraciones,
  editContacto,
  editCuponera,
  editEmbarazo,
  editSociedad,
  editPlan,
  editPatologias,
  editPass,
  deleteSocio,
};
