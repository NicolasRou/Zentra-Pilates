import { useContext, useState, useEffect } from "react";
import { DataSocioContext } from "@/contexts/dataSocio";
import styles from "@/styles/Socios/InfoBasica.module.css";
import Loader from "./Loader";

export default function InfoBasica() {
  const { dataSocio } = useContext(DataSocioContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!dataSocio) {
    return <Loader />;
  }

  const changeDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const dateFormated = changeDateFormat(dataSocio[0].fechanacimiento);

  return (
    <div className={styles.container_info}>
      <div className={styles.title}>
        <h2>Información básica</h2>
      </div>
      <div className={styles.container_datos}>
        <div className={styles.info_datos}>
          <ul>
            <li className={styles.datos_li}>
              <label htmlFor="Name">
                {" "}
                Nombre completo
                <input
                  type="text"
                  id="Name"
                  value={dataSocio && dataSocio[0].nombre}
                  readOnly
                />
              </label>
            </li>
            <li className={styles.datos_li}>
              <label htmlFor="id">
                {" "}
                Documento de identidad
                <input
                  type="text"
                  id="id"
                  value={dataSocio && dataSocio[0].ci}
                  readOnly
                />
              </label>
            </li>
            <li className={styles.datos_li}>
              <label htmlFor="nacimiento">
                {" "}
                Fecha de nacimiento
                <input
                  type="date"
                  id="nacimiento"
                  value={dataSocio && dateFormated}
                  readOnly
                />
              </label>
            </li>
            <li className={styles.datos_li}>
              <label htmlFor="telefono">
                {" "}
                Telefono/Celular
                <input
                  type="tect"
                  id="Name"
                  value={dataSocio && dataSocio[0].contacto}
                  readOnly
                />
              </label>
            </li>
            <li className={styles.datos_li}>
              <label htmlFor="emal">
                {" "}
                Correo electronico
                <input
                  type="email"
                  id="email"
                  value={dataSocio && dataSocio[0].mail}
                  readOnly
                />
              </label>
            </li>
            <li className={styles.datos_li}>
              <label htmlFor="sociedad">
                {" "}
                Sociedad medica/Emergencia
                <input
                  type="text"
                  id="sociedad"
                  value={dataSocio && dataSocio[0].sociedad}
                  readOnly
                />
              </label>
            </li>
          </ul>
        </div>
        <div className={styles.info_datos}>
          <ul>
            <li className={styles.datos_li}>
              <label htmlFor="patologias">
                {" "}
                Patologias (en caso de tenerlas, aclare cual)
                <input
                  type="text"
                  id="patologias"
                  value={
                    dataSocio && dataSocio[0].patologias
                      ? dataSocio[0].patologias
                      : ""
                  }
                  readOnly
                />
              </label>
            </li>
            <li className={styles.datos_li}>
              <label htmlFor="embarazo">
                {" "}
                Embarazo (aclare semana de embarazo)
                <input
                  type="text"
                  id="embarazo"
                  value={
                    dataSocio && dataSocio[0].embarazo
                      ? dataSocio[0].embarazo
                      : ""
                  }
                  readOnly
                />
              </label>
            </li>
            <li className={styles.datos_li}>
              <label htmlFor="consideraciones">
                {" "}
                Si considera que hay algo importante que deba saber el
                instructor al momento de indicarle un ejercicio aclare a
                continuación
                <input
                  type="text"
                  id="consideraciones"
                  value={
                    dataSocio && dataSocio[0].consideraciones
                      ? dataSocio[0].consideraciones
                      : ""
                  }
                  readOnly
                />
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
