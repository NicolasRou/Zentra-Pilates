import { useContext } from "react";
import { DataSocioContext } from "@/contexts/dataSocio";
import styles from "@/styles/Socios/InfoBasica.module.css";

export default function InfoBasica() {
  const dataSocio = useContext(DataSocioContext);

  if (!dataSocio) {
    return <p>Cargando...</p>;
  }
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
                  value={dataSocio && dataSocio[0].name}
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
                  value={dataSocio && dataSocio[0].id_socios}
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
                  value= "1995-11-29"
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
                  value={dataSocio && dataSocio[0].name}
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
          </ul>
        </div>
        <div className={styles.info_datos}>
          <ul>
            <li className={styles.datos_li}>
              <label htmlFor="sociedad">
                {" "}
                Sociedad medica/Emergencia
                <input
                  type="text"
                  id="sociedad"
                  value={dataSocio && dataSocio[0].name}
                  readOnly
                />
              </label>
            </li>
            <li className={styles.datos_li}>
              <label htmlFor="patologias">
                {" "}
                Patologias (en caso de tenerlas, aclare cual)
                <input
                  type="text"
                  id="patologias"
                  value={dataSocio && dataSocio[0].name}
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
                  value={dataSocio && dataSocio[0].name}
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
                  value={dataSocio && dataSocio[0].name}
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
