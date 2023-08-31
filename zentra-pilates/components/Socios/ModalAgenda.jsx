import styles from "@/styles/Socios/ModalAgenda.module.css";

export default function ModalAgenda({ isOpen, handleClose, title, content }) {
  return (
    <div
      className={`${styles.modal_container} ${
        isOpen ? styles.open : styles.close
      }`}
    >
      {isOpen && (
        <>
          <div className={styles.container_title}>
            <h2>{title}</h2>
          </div>
          <div className={styles.container_content}>{content}</div>
          <div className={styles.container_button}>
            <button onClick={handleClose}>Cerrar</button>
          </div>
        </>
      )}
    </div>
  );
}
