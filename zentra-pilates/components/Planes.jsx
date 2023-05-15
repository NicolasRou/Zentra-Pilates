import styles from "@/styles/Planes.module.css";
import Link from "next/link";

export default function Planes() {
  return (
    <div>
      <div className={styles.title}>
        <h2>
          ¡Tenemos planes adaptados a tus necesidades! <br /> Valor de la
          inscripción por única vez $420
        </h2>
      </div>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.encabezados}>
            <th>
              <h3>1 Vez por semana</h3>
              <p>4 clases mensuales</p>
            </th>
            <th>
              <h3>2 Veces por semana</h3>
              <p>8 clases mensuales</p>
            </th>
            <th>
              <h3>3 Veces por semana</h3>
              <p>12 clases mensuales</p>
            </th>
          </tr>
          <tr className={styles.precios}>
            <td>$1250</td>
            <td>$1990</td>
            <td>$2500</td>
          </tr>
          <tr>
            <td className={styles.td}>
              <p>Podés elegir todas las actividades</p>
              <p>Clases grupales</p>
              <p>Pilates (Incluye para embarazadas)</p>
              <p>Pilates funcional</p>
              <p>Pilates TRX</p>
              <p>Stretching</p>
              <p>Yoga</p>
              <Link href="" className={styles.link}>
                INSCRIBIRME
              </Link>
            </td>
            <td className={styles.td}>
              <p>Podés elegir todas las actividades</p>
              <p>Clases grupales</p>
              <p>Pilates (Incluye para embarazadas)</p>
              <p>Pilates funcional</p>
              <p>Pilates TRX</p>
              <p>Stretching</p>
              <p>Yoga</p>
              <Link href="" className={styles.link}>
                INSCRIBIRME
              </Link>
            </td>
            <td className={styles.td}>
              <p>Podés elegir todas las actividades</p>
              <p>Clases grupales</p>
              <p>Pilates (Incluye para embarazadas)</p>
              <p>Pilates funcional</p>
              <p>Pilates TRX</p>
              <p>Stretching</p>
              <p>Yoga</p>
              <Link href="" className={styles.link}>
                INSCRIBIRME
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
