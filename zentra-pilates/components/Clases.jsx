import Link from "next/link";
import Image from "next/image";
import clases1 from "../src/assets/img/clases1.png";
import clases2 from "../src/assets/img/clases2.png";
import clases3 from "../src/assets/img/clases3.png";
import styles from "@/styles/Clases.module.css";

export default function Clases() {
  return (
    <div className={styles.container__clases} id="clases">
      <div className={styles.clases}>
        <div className={styles.clases__card}>
          <h3>Clases por zoom</h3>
          <p>
            Entrenamientos de pilates, pilates funcional, pilates para
            embarazadas y stretching online grupal por Zoom. Conocé nuestra
            promo y reservá tu lugar ahora!
          </p>
          <div className={styles.image}>
            <Image src={clases1} width={450} alt="clases por zoom" />
            <div className={styles.link__float}>
              <Link href="" className={styles.link}>
                INSCRIBIRME
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.clases__card}>
          <h3>Clase suelta</h3>
          <p>
            Podés hacer una clase sin plan mensual, en cualquiera de nuestras
            actividades. Tu lugar se reserva coordinando previamente y según
            desponibilidad de agenda.
          </p>
          <div className={styles.image}>
            <Image src={clases2} width={450} alt="clase pilates suelta" />
            <div className={styles.link__float}>
              <Link href="" className={styles.link}>
                RESERVAR CLASE
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.clases__card}>
          <h3>Zentra one</h3>
          <p>
            Plan individual o en pareja presencial en el estudio. Una profesora
            y el estudio sólo para vos. Diseñamos tu entrenamiento de manera
            individual y exclusiva.
          </p>
          <div className={styles.image}>
            <Image src={clases3} width={450} alt="pilates individual" />
            <div className={styles.link__float}>
              <Link href="" className={styles.link}>
                LISTA DE ESPERA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
