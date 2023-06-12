import styles from "@/styles/Reserva.module.css";
import miniLogo from "../src/assets/miniLogo.png";
import Image from "next/image";


export default function Reserva() {
  return (
    <div className={styles.container} id="contacta">
      <div className={styles.container__title}>
        <h3>RESERVÁ TU PRIMER CLASE</h3>
      </div>
      <div>
        <form
          action=""
          method="post"
          encType="text/plain"
          className={styles.container__form}
        >
          <div className={styles.container__input}>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Dirección de correo electrónico"
            />
          </div>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Mensaje"
            required
          />
          <button type="submit" className={styles.form__btn}>
            Enviar
          </button>
        </form>
      </div>
      <div className={styles.logo}>
        <Image src={miniLogo} width={150} alt="Logo Zentra Pilates" className={styles.logoSmall}/>
      </div>
    </div>
  );
}
