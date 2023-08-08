const express = require("express");
const { verifyToken } = require("../middlewares/verify");
const { getHorarios, getHorariosId } = require("../controllers/getHorarios");

const router = express.Router();

router.get("/horarios", verifyToken, getHorarios);

router.post("/horarios/:id", verifyToken, getHorariosId);

module.exports = router;
