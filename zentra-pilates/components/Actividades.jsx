import styles from "@/styles/Actividades.module.css";
import Card from "./Card";
import mat from "../src/assets/card/mat.png";
import embarazadas from "../src/assets/card/embarazadas.png";
import funcional from "../src/assets/card/funcional.png";
import trx from "../src/assets/card/trx.png";
import stretching from "../src/assets/card/stretching.png";
import yoga from "../src/assets/card/yoga.png";

export default function Actividades() {
  return (
    <div className={styles.block}>
      <div className={styles.title}>
        <h2>Actividades en Zentra Estudio</h2>
      </div>
      <div className={styles.container__cards}>
        <Card
          picture={mat}
          width={200}
          title="Pilates mat"
          description="Método Pilates mat con accesorios especiales. Tonificas, alivias dolores y mejora tu estado de ánimo."
          imgDescription="Imagen de Pilates mat"
        />
        <Card
          picture={embarazadas}
          width={200}
          title="Pilates para embarazadas"
          description="Una práctica de Pilates mat adaptada en ejercicios y accesorios para que te sientas cuidada y en forma."
          imgDescription="Imagen de Pilates para embarazadas"
        />
        <Card
          picture={funcional}
          width={200}
          title="Pilates Funcional"
          description="Fusión de Pilates mat y funcional, tonificás, alivias dolores, quemás calorías y te llenás de energía!"
          imgDescription="Imagen de Pilates Funcional"
        />
        <Card
          picture={trx}
          width={200}
          title="Pilates TRX"
          description="Método Pilates mat con accesorios especiales. Tonificás, alivias dolores y mejora tu estado de ánimo."
          imgDescription="Imagen de Pilates TRX"
        />
        <Card
          picture={stretching}
          width={200}
          title="Stretching"
          description="Ejercicios de estiramiento para aumentar la flexibilidad muscular, para evitar lesiones y dolencias."
          imgDescription="Imagen de Stretching"
        />
        <Card
          picture={yoga}
          width={200}
          title="Yoga"
          description="Muy pronto retomaremos con las clases de YOGA."
          imgDescription="Imagen de YOGA"
        />
      </div>
    </div>
  );
}
