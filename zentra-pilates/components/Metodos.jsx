import styles from "@/styles/Metodos.module.css";
import { useState } from "react";

export default function Pago() {
  const [activeTab, setActiveTab] = useState(1);
  const selectTab = (numberTab) => {
    if (activeTab !== numberTab) {
      setActiveTab(numberTab);
    }
  };

  return (
    <div className={styles.container__pago}>
      <div className={styles.container__titles}>
        <div className={styles.container__metodos}>
          <span></span>
          <button
            className={styles.button__metodos}
            onClick={() => selectTab(1)}
          >
            <h3>Métodos de pago</h3>
          </button>
        </div>
        <div className={styles.container__fecha}>
          <button className={styles.button__fecha} onClick={() => selectTab(2)}>
            <h3>Fecha de Pago</h3>
          </button>
        </div>
        <div className={styles.container__confirma}>
          <button
            className={styles.button__confirma}
            onClick={() => selectTab(3)}
          >
            <h3>Confirma Pago</h3>
          </button>
        </div>
      </div>
      <div className={styles.container__description}>
        <div
          className={
            activeTab == "1"
              ? "show container__descriptionMetodos"
              : "displayNone"
          }
        >
          <div>
            <h3>DEPÓSITO O TRANSFERENCIA BROU</h3>
            <p>
              Caja de ahorro en pesos BROU <br /> 1100 35395 00001
            </p>
          </div>
          <div>
            <p>
              N° viejo: Caja de ahorro <br /> en pesos BROU <br /> 6000460388
            </p>
          </div>
          <div>
            <h4>Efectivo en el estudio:</h4>
            <p>
              Agradecemos el importe justo de la cuota para evitar la
              manipulación de efectivo.
            </p>
          </div>
        </div>
        <div
          className={
            activeTab == "2"
              ? "show container__descriptionMetodos"
              : "displayNone"
          }
        >
          <p>
            El pago vence el 10 de cada mes. De no hacerlo habrá una multa del
            10% de tu cuota mes y no se reservará tu lugar.
          </p>
        </div>
        <div
          className={
            activeTab == "3"
              ? "show container__descriptionMetodos"
              : "displayNone"
          }
        >
          <p>
            Luego de realizar tu pago enviá tu comprobante con nombre y apellido
            a pilateszentra@gmail.com
          </p>
        </div>
        <style jsx>
          {`
            .show {
              display: block;
            }
            .container__descriptionMetodos {
              padding: 4%;
            }
            .container__descriptionMetodos h3 {
              margin: 0;
              font-size: 1.5rem;
              color: #2c3e45;
            }
            .container__descriptionMetodos p,
            .container__descriptionMetodos h4 {
              color: #2c3e45;
            }
            .container__descriptionMetodos h4 {
              font-weight: bold;
              font-size: 1.5rem;
            }
            .container__descriptionMetodos p {
              font-size: 1.3rem;
            }
            .displayNone {
              display: none;
            }
            @media screen and (max-width: 767px) {
              
              .container__descriptionMetodos h3 {
                
                font-size: 1.2rem;
                
              }
              .container__descriptionMetodos h4 {
                
                font-size: 1.1rem;
              }
              .container__descriptionMetodos p {
                font-size: 1rem;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}
