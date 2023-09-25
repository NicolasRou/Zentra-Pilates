const express = require("express");
const { verifyToken } = require("../middlewares/verify");
const {
  getHorarios,
  getHorariosId,
  viewHorarios,
  viewNextWeekHorarios,
  replaceHora,
  deleteClase,
  agendaHora,
} = require("../controllers/getHorarios");

const router = express.Router();

router.get("/horarios", verifyToken, getHorarios);

router.post("/horarios/:id", verifyToken, getHorariosId);
router.post("/horas/:id", verifyToken, viewHorarios);
router.post("/disponibles/:id", verifyToken, viewNextWeekHorarios);
router.post("/agendar/:id", verifyToken, agendaHora);
router.post("/delete/:id", verifyToken, deleteClase);
router.post("/replace/:id", verifyToken, replaceHora);

module.exports = router;
