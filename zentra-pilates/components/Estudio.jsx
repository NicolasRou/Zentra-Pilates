import styles from "@/styles/Estudio.module.css";
import estudio from "../src/assets/img/estudio.png";
import Image from "next/image";

export default function Estudio() {
  return (
    <div className={styles.container} id="estudio">
      <div>
        <Image src={estudio} width={1000} alt="Profesora de Pilates"/>
      </div>
      <div className={styles.text}>
        <h4>Nuestro estudio:</h4>
        <p>
          Estudio completamente equipado y con cupos adaptados a normas vigentes
          de salud e higiene.
        </p>
        <p>
          Cumplimos con las actuales normas sanitarias de protocolo Anti-Covid
          60 metros cuadrados, con un máximo de 8 alumn@s por clase.
        </p>
      </div>
    </div>
  );
}
