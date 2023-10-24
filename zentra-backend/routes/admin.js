const express = require("express");
const { verifyToken } = require("../middlewares/verify");
const {
  getClases,
  eliminarClase,
  agregarClase,
  claseSocio,
} = require("../controllers/Admin/clases");
const { getSocios, editSocio } = require("../controllers/Admin/socios");

const router = express.Router();

router.post("/buscarSocio", verifyToken, getSocios);
router.post("/clases", verifyToken, getClases);
router.post("/editSocio", verifyToken, editSocio);
router.post("/eliminarClase", verifyToken, eliminarClase);
router.post("/agregarClase", verifyToken, agregarClase);
router.post("/claseSocio", verifyToken, claseSocio);

module.exports = router;
