import styles from "@/styles/Admin/EditAgenda.module.css";
import ClasesSocio from "./ClasesSocio";
import { useSocio } from "@/contexts/dataSocio";
import Loader from "../Socios/Loader";
import EliminarAgenda from "./EliminarAgenda";
import ReagendarFijo from "./ReagendaFijo";

export default function EditAgenda() {
  const { dataSocio } = useSocio();

  return (
    <section className={styles.container}>
      <div className={styles.container_title}>
        <h2>Editar agenda del socio</h2>
      </div>
      <div>
        {dataSocio ? (
          <div>
            <div className={styles.clases}>
              <h3>Clases en los últimos 30 días:</h3>
              <ClasesSocio />
            </div>
            <div className={styles.subtitle}>
              <h3>Eliminar agenda</h3>
              <EliminarAgenda />
            </div>
            <div className={styles.subtitle}>
              <h3>Reagendar socio</h3>
              <ReagendarFijo />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}
