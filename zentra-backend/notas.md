const login = async (req, res, next) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res.send({
        success: false,
        data: [],
        message: "Ingrese todos los campos",
      });
    }
    const mail2 = await db.query("select * from socios where id_socios = $1", [
      req.body.id,
    ]);

    if (!mail2 || user.rows[0].mail != req.body.mail) {
      return res.status(401).json({
        success: false,
        data: [],
        message: "Mail incorrecto",
      });
    }
    return res.send({
      success: true,
      data: [user.rows[0]],
      message: "Login con exito",
    });
   
    const validPassword = await db.query(
      "select * from socios where password = $1",
      [req.body.password]
    );

    if (!validPassword || user.rows[0].password != req.body.password) {
      return res.status(401).json({
        success: false,
        data: [],
        message: "Contraseña incorrecta",
      });
    }

    return res.send({
      success: true,
      data: [user.rows[0]],
      message: "Login con exito",
    });


    // const validMail = await db.query("select * from socios where mail = $1", [
    //   req.body.mail,
    // ]);
    // if (!validMail || user.rows[0].mail != req.body.mail) {
    //   return res.status(401).json({
    //     success: false,
    //     data: [],
    //     message: "Mail incorrecto",
    //   });
    // }
    // return res.send({
    //   success: true,
    //   data: [user.rows[0]],
    //   message: "Login con exito",
    // });

    // const validPassword = await db.query(
    //   "select * from socios where password = $1",
    //   [req.body.password]
    // );

    // if (!validPassword || user.rows[0].password != req.body.password) {
    //   return res.status(401).json({
    //     success: false,
    //     data: [],
    //     message: "Contraseña incorrecta",
    //   });
    // }
    // jwt.sign({
    //   name: user.rows[0].name,

    // })

    // return res.send({
    //   success: true,
    //   data: [user.rows[0]],
    //   message: "Login con exito",
    // });
  } catch (error) {
    return next(error);
  }
};
