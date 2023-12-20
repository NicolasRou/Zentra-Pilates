Si deseas evitar la inyección SQL y al mismo tiempo minimizar la modificación de tu código actual, puedes optar por utilizar consultas preparadas (también conocidas como consultas parametrizadas) con la biblioteca pg que ya estás utilizando. Las consultas preparadas son una técnica eficaz para prevenir la inyección SQL.

Aquí hay un ejemplo de cómo podrías adaptar tu código para usar consultas preparadas con pg:


const { Pool } = require('pg');

const pool = new Pool({
  user: 'usuario_bd',
  host: 'localhost',
  database: 'nombre_bd',
  password: 'contraseña_bd',
  port: 5432,
});

const getSocios = async (req, res) => {
  try {
    const { identificador } = req.body;

    // Utilizamos una consulta preparada con el signo de dólar ($) como marcador de posición
    const query = {
      text: 'SELECT * FROM socios2 WHERE nombre ILIKE $1',
      values: [`%${identificador}%`],
    };

    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      data: result.rows,
      message: 'Socios obtenidos',
    });
  } catch (error) {
    console.error('Error al acceder a los datos del socio', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
};



Si deseas evitar la inyección SQL y al mismo tiempo minimizar la modificación de tu código actual, puedes optar por utilizar consultas preparadas (también conocidas como consultas parametrizadas) con la biblioteca pg que ya estás utilizando. Las consultas preparadas son una técnica eficaz para prevenir la inyección SQL.

Aquí hay un ejemplo de cómo podrías adaptar tu código para usar consultas preparadas con pg:

javascript
Copy code
const { Pool } = require('pg');

const pool = new Pool({
  user: 'usuario_bd',
  host: 'localhost',
  database: 'nombre_bd',
  password: 'contraseña_bd',
  port: 5432,
});

const getSocios = async (req, res) => {
  try {
    const { identificador } = req.body;

    // Utilizamos una consulta preparada con el signo de dólar ($) como marcador de posición
    const query = {
      text: 'SELECT * FROM socios2 WHERE nombre ILIKE $1',
      values: [`%${identificador}%`],
    };

    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      data: result.rows,
      message: 'Socios obtenidos',
    });
  } catch (error) {
    console.error('Error al acceder a los datos del socio', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    });
  }
};
En este código:

Se utiliza un objeto query con las propiedades text y values. El text contiene la consulta SQL con un marcador de posición $1, y values proporciona los valores que se insertarán en el lugar del marcador de posición.

Esto ayuda a prevenir la inyección SQL, ya que los valores se manejan de manera segura y no se concatenan directamente en la consulta.

Esta solución implica un cambio mínimo en tu código existente y mejora significativamente la seguridad. Aunque es preferible el uso de ORM como Sequelize, si prefieres no hacer cambios mayores, utilizar consultas preparadas es una buena opción.