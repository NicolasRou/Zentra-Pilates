import Link from "next/link";
import logo from "../../src/assets/Logo.png";
import styles from "@/styles/Socios/LayoutSocios.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import InfoBasica from "./InfoBasica";
import Historial from "./Historial";
import Agenda from "./Agenda";

export default function LayoutSocios() {
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
  return (
    <>
      <div className={styles.container_nav}>
        <div className={styles.container_logo}>
          <Image src={logo} width={200} alt="Profesora de pilates" />
        </div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href={""}>Inicio</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Cerrar sesion</button>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.container_datos}>
        <div className={styles.menu_datos}>
          <div>
            <h3>Personal</h3>
          </div>
          <div className={styles.container_button}>
            <button
              className={activeTab == "1" ? "active" : "button"}
              onClick={() => selectTab(1)}
            >
              <h4>Perfil</h4>
            </button>
            <button
              className={activeTab == "2" ? "active" : "button"}
              onClick={() => selectTab(2)}
            >
              <h4>Historial de clases</h4>
            </button>
            <button
              className={activeTab == "3" ? "active" : "button"}
              onClick={() => selectTab(3)}
            >
              <h4>Agenda de clases</h4>
            </button>
          </div>
        </div>
        <div className={activeTab == "1" ? "show " : "displayNone"}>
          <InfoBasica />
        </div>
        <div className={activeTab == "2" ? "show " : "displayNone"}>
          <Historial />
        </div>
        <div className={activeTab == "3" ? "show " : "displayNone"}>
          <Agenda />
        </div>
      </div>
      <style jsx>
        {`
          .show {
            display: block;
          }
          .displayNone {
            display: none;
          }
        `}
      </style>
    </>
  );
}
