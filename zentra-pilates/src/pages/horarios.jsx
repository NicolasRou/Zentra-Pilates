import Layout from "../../components/Layout";
import Actividades from "../../components/Actividades";
import Reserva from "../../components/Reserva";
import styles from "@/styles/Horarios.module.css";
import Image from "next/image";
import portada from "../assets/img/portada.png";
import phone2 from "../assets/icons/phone2.svg";
import reloj from "../assets/icons/reloj.svg";
import pin from "../assets/icons/pin.svg";

export default function Horarios() {
  return (
    <>
      <Layout
        title="Horarios - Zentra Pilates"
        content="Consultá por nuestros horarios. Zentra Estudio de Pilates, Yoga y stretching. En magallanes 1256, Cordón, Montevideo"
      >
        <div>
          <div className={styles.container__portada}>
            <Image
              src={portada}
              className={styles.bg__img}
              alt="Imagen de portada pilates"
            />
            <div className={styles.portada}>
              <h3>Horarios de actividades</h3>
              <div className={styles.container__table}>
                <div className={styles.table__item}>
                  <Image
                    src={reloj}
                    width={30}
                    className={styles.img}
                    alt="icono reloj"
                  />
                  <p>HORARIOS</p>
                  <p>
                    De lunes a <br /> sábados
                  </p>
                </div>

                <div>
                  <Image
                    src={phone2}
                    width={30}
                    className={styles.img}
                    alt="icono telefono"
                  />
                  <p>TELÉFONO</p>
                  <p>098353971</p>
                </div>
                <div>
                  <Image
                    src={pin}
                    width={30}
                    className={styles.img}
                    alt="icono ubicación"
                  />
                  <p>DIRECCIÓN</p>
                  <p>
                    Magallanes 1256 <br /> Esq. Constituyente
                  </p>
                </div>
              </div>
              <div className={styles.subtitle}>
                <p>Presenciales: Grupos reducidos</p>
                <p>Online: Clases por zoom</p>
              </div>
            </div>
          </div>
          <div className={styles.text}>
            <h3>Horarios de actividades</h3>
            <p>
              Consultá horarios con cupos disponibles por Whatsapp al 098353971
            </p>
          </div>
          <Actividades />
          <Reserva />
        </div>
      </Layout>
    </>
  );
}
