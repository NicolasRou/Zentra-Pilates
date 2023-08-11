const express = require("express");
const { verifyToken } = require("../middlewares/verify");
const {
  getHorarios,
  getHorariosId,
  viewHorarios,
} = require("../controllers/getHorarios");

const router = express.Router();

router.get("/horarios", verifyToken, getHorarios);

router.post("/horarios/:id", verifyToken, getHorariosId);
router.post("/horarios/", verifyToken, viewHorarios);

module.exports = router;
