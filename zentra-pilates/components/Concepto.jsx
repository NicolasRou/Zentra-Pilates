import Image from "next/image";
import concepto from "../src/assets/img/concepto.png"
import styles from "@/styles/Concepto.module.css";

export default function Concepto() {
  return (
    <div className={styles.container} id="nosotras">
      <div className={styles.container__text}>
        <h2>Concepto Zentra</h2>
        <p>
          Nuestra misión es mejorar la calidad de vida de hombres y mujeres, sin
          importar cual sea tu condición física. Todas nuestras actividades
          están basadas en el método pilates.
        </p>
        <p>
          Pilates es un método de ejercicio y movimiento físico creado para
          estirar, fortalecer y equilibrar el cuerpo, fue creado por Joseph
          Pilates, transforma totalmente la manera en que tu cuerpo se ve, se
          siente y actúa.
        </p>
      </div>
      <div className={styles.container__img}>
        <Image
          src={concepto}
          alt="Alumnos haciendo pilates"
          width={930}
          
        />
      </div>
    </div>
  );
}
