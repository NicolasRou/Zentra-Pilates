import logo from "../../src/assets/Logo.png";
import inicio from "../../src/assets/icons/inicio.svg";
import agenda from "../../src/assets/icons/agenda.png";
import historial from "../../src/assets/icons/historial.png";
import salir from "../../src/assets/icons/salir.svg";
import perfil from "../../src/assets/icons/perfil.png";
import personal from "../../src/assets/icons/personal.png";
import pilatesAnimado from "../../src/assets/pilatesAnimado.png";
import styles from "@/styles/Socios/LayoutSocios.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import InfoBasica from "./InfoBasica";
import Historial from "./Historial";
import Agenda from "./Agenda";

export default function LayoutSocios({ refreshData }) {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    router.push("/login");
  };

  const [activeTab, setActiveTab] = useState(0);
  const selectTab = (numberTab) => {
    if (activeTab !== numberTab) {
      setActiveTab(numberTab);
    }
  };

  const handleRefreshDashboard = () => {
    router.reload();
  };
  return (
    <>
      <div className={styles.container_nav}>
        <div className={styles.container_logo}>
          <Image src={logo} width={200} alt="Profesora de pilates" />
        </div>
        <nav className={styles.nav}>
          <ul className={styles.nav_ul}>
            <li>
              <button onClick={handleRefreshDashboard}>
                <Image src={inicio} width={15} alt="inicio" />
                Inicio
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>
                <Image src={salir} width={15} alt="salir" />
                Salir
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.container_datos}>
        <div className={styles.menu_datos}>
          <div className={styles.menu_title}>
            <h3>Personal</h3>
            <Image src={personal} width={20} alt="personal" />
          </div>
          <div className={styles.container_button}>
            <button
              className={activeTab == "1" ? "active" : "button"}
              onClick={() => selectTab(1)}
            >
              <Image src={perfil} width={20} alt="perfil" />
              <p>&nbsp;&nbsp;Perfil</p>
            </button>
            <button
              className={activeTab == "2" ? "active" : "button"}
              onClick={() => selectTab(2)}
            >
              <Image src={historial} width={20} alt="historial" />
              <p>Historial de clases</p>
            </button>
            <button
              className={activeTab == "3" ? "active" : "button"}
              onClick={() => selectTab(3)}
            >
              <Image src={agenda} width={20} alt="agenda" />
              <p>Agenda de clases</p>
            </button>
          </div>
        </div>
        <div className={activeTab == "1" ? "show " : "displayNone"}>
          <InfoBasica />
        </div>
        <div className={activeTab == "2" ? "show " : "displayNone"}>
          <div className={styles.container_titles}>
            <h2 className={styles.title}>Historial de clases</h2>
            <h3 className={styles.subtitle}>Selecciona el mes y año para ver tu historial de clases</h3>
          </div>
          <Historial />
        </div>
        <div className={activeTab == "3" ? "show " : "displayNone"}>
          <Agenda />
        </div>
        <div className={activeTab == "0" ? "showPanel" : "displayNone"}>
          <div className={styles.bg_img}>
            <Image src={pilatesAnimado} width={700} alt="Pilates animado" />
          </div>
          <div className={styles.panel_contain}>
            <h3>Hola, bienvenido a tu panel de control</h3>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .show {
            display: block;
            width: 70%;
          }
          .displayNone {
            display: none;
          }
          .showPanel {
            display: block;
            padding: 1% 3%;
          }
          .active {
            background-color: #A4B3A5;
            color: black;
          }
          .active:hover {
            color: white;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
}
