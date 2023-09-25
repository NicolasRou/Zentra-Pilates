const db = require("../db/index");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../middlewares/verify");

const login = async (req, res, next) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res.status(400).json({
        success: false,
        data: [],
        message: "Ingrese todos los campos",
      });
    }
    const user = await db.query("select * from socios2 where mail = $1", [
      req.body.mail,
    ]);

    if (!user.rows.length || user.rows[0].mail !== req.body.mail) {
      return res.status(401).json({
        success: false,
        data: [],
        message: "Mail incorrecto",
      });
    }

    const validPassword = await db.query(
      "select * from socios2 where mail = $1 and pass = $2",
      [req.body.mail, req.body.password]
    );
    if (!validPassword.rows.length) {
      return res.status(401).json({
        success: false,
        data: [],
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      {
        name: user.rows[0].name,
        mail: user.rows[0].mail,
      },
      TOKEN_SECRET
    );

    return res.send({
      success: true,
      data: [validPassword.rows[0]],
      message: "Login con exito",
      token,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = { login };
