const express = require("express");
const { login } = require("../controllers/login");
const { getSocios, getSocioId } = require("../controllers/socios");
const { verifyToken } = require("../middlewares/verify");

const router = express.Router();

router.get("/socios", verifyToken, getSocios);
router.get("/socios/:id", getSocioId);

router.post("/login", login);

module.exports = router;
