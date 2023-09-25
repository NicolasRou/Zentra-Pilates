const express = require("express");
const { verifyToken } = require("../middlewares/verify");
const { getClases, holasocio } = require("../controllers/Admin/clases");
const { getSocios } = require("../controllers/Admin/socios");


const router = express.Router();

router.post("/buscarSocio" , verifyToken, getSocios)
router.post("/clases", verifyToken, getClases);
router.post("/holasocio", verifyToken, holasocio);

module.exports = router;
