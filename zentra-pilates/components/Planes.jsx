import styles from "@/styles/Planes.module.css";
import Link from "next/link";

export default function Planes() {
  return (
    <div className={styles.planes}>
      <div className={styles.title}>
        <h2>
          ¡Tenemos planes adaptados a tus necesidades! <br /> Valor de la
          inscripción por única vez $490
        </h2>
      </div>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.encabezados}>
            <th>
              <h3>4 Clases mensuales</h3>
            </th>
            <th>
              <h3>8 Clases mensuales</h3>
            </th>
            <th>
              <h3>12 Clases mensuales</h3>
            </th>
          </tr>
          <tr className={styles.precios}>
            <td>$1490</td>
            <td>$2390</td>
            <td>$2990</td>
          </tr>
          <tr>
            <td className={styles.td}>
              <p>Podés elegir todas las actividades</p>
              <p>Clases grupales</p>
              <p>Pilates (Incluye para embarazadas)</p>
              <p>Pilates funcional</p>
              <p>Pilates TRX</p>
              <p>Stretching</p>
              <div className={styles.container__link}>
                <Link href="/inscripcion" className={styles.link}>
                  INSCRIBIRME
                </Link>
              </div>
            </td>
            <td className={styles.td}>
              <p>Podés elegir todas las actividades</p>
              <p>Clases grupales</p>
              <p>Pilates (Incluye para embarazadas)</p>
              <p>Pilates funcional</p>
              <p>Pilates TRX</p>
              <p>Stretching</p>
              <div className={styles.container__link}>
                <Link href="/inscripcion" className={styles.link}>
                  INSCRIBIRME
                </Link>
              </div>
            </td>
            <td className={styles.td}>
              <p>Podés elegir todas las actividades</p>
              <p>Clases grupales</p>
              <p>Pilates (Incluye para embarazadas)</p>
              <p>Pilates funcional</p>
              <p>Pilates TRX</p>
              <p>Stretching</p>
              <div className={styles.container__link}>
                <Link href="/inscripcion" className={styles.link}>
                  INSCRIBIRME
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.block__link}>
        <div>
          <Link href="https://wa.me/59898353971" className={styles.link_clases}>
            MÁS CLASES
          </Link>
        </div>
      </div>
    </div>
  );
}
