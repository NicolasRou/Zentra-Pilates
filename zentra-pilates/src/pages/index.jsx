import styles from "@/styles/Home.module.css";
import Layout from "../../components/Layout";
import Concepto from "../../components/Concepto";
import Actividades from "../../components/Actividades"
import Planes from "../../components/Planes"
import Clases from "../../components/Clases"
import Estudio from "../../components/Estudio"
import Reserva from "../../components/Reserva"

export default function Home() {
  return (
    <>
      <Layout title=" Inicio - Zentra Pilates" content="Conocé nuestros planes en Zentra. Estudio de Pilates, Yoga y stretching. En magallanes 1256, Cordón, Montevideo">
        <div className={styles.container__portada}>
          <h1>
            Estudio de pilates <br /> y stretching
          </h1>
          <h2>
            Clases presenciales en grupos <br /> reducidos de hasta 10 personas.
          </h2>
        </div>
        <Concepto/> 
        <Actividades/>
        <Planes/>
        <Clases/>
        <Estudio/>
        <Reserva/>
      </Layout>
    </>
  );
}
