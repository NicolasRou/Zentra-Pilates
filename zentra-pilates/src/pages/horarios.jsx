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
              <div className={styles.p}>
                <p>Presenciales: Grupos reducidos</p>
                <p>Online: Clases por zoom</p>
              </div>
            </div>
          </div>
          <div className={styles.subtitle}>
            <h3>¡Elegí tu horario y contactanos!</h3>
          </div>
          <div className={styles.text}>
            <table className={styles.table__container}>
              <thead>
                <tr className={styles.días}>
                  <th className={styles.icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-clock-hour-3"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                      <path d="M12 12h3.5"></path>
                      <path d="M12 7v5"></path>
                    </svg>
                  </th>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                  <th>Sábado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.hora}>09:00</td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <td className={styles.hora}>11:00</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                </tr>
                <tr>
                  <td className={styles.hora}>12:00</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                    <p> Pilates Stretching</p>
                  </td>
                </tr>
                <tr>
                  <td className={styles.hora}>17:00</td>
                  <td>
                    <p>TRX + Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial + Stretching pres.</p>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <td className={styles.hora}>18:30</td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>TRX + Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <td className={styles.hora}>19:45</td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Funcional + Stretching pres.</p>
                  </td>
                  <td>
                    <p>TRX + Pilates presencial</p>
                  </td>
                  <td>
                    <p>TRX + Pilates presencial</p>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <td className={styles.hora}>20:45</td>
                  <td>
                    <p>Pilates funcional presencial</p>
                  </td>
                  <td>
                    <p>Stretching presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>Pilates presencial</p>
                  </td>
                  <td>
                    <p>TRX + Pilates presencial</p>
                  </td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Actividades />
          <Reserva />
        </div>
      </Layout>
    </>
  );
}
