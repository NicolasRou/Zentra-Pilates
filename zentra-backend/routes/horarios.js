const express = require("express");
const { verifyToken } = require("../middlewares/verify");
const {
  getHorarios,
  getHorariosId,
  viewHorarios,
  viewNextWeekHorarios,
  replaceHora
} = require("../controllers/getHorarios");

const router = express.Router();

router.get("/horarios", verifyToken, getHorarios);

router.post("/horarios/:id", verifyToken, getHorariosId);
router.post("/horas", verifyToken, viewHorarios);
router.post("/disponibles", verifyToken, viewNextWeekHorarios);
router.post("/replace/:id", verifyToken, replaceHora);

module.exports = router;
