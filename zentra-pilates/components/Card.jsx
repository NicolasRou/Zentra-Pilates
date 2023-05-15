import Image from "next/image";
import styles from "@/styles/Actividades.module.css"

export default function Card({ picture, title, description, imgDescription }) {
  return (
    <div className={styles.container}>
      <div className={styles.container__img}>
        <Image src={picture} alt={imgDescription} className={styles.img}/>
      </div>
      <div className={styles.container__text}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
