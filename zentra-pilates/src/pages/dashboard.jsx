import { useEffect, useState } from "react";
import LayoutSocios from "../../components/Socios/LayoutSocios";
import styles from "@/styles/Socios/LayoutSocios.module.css";
import { useRouter } from "next/router";
import { DataSocioProvider } from "@/contexts/dataSocio";
import InfoBasica from "../../components/Socios/InfoBasica";
import Historial from "../../components/Socios/Historial";
import Agenda from "../../components/Socios/Agenda";

export default function Dashboard() {
  const router = useRouter();
  const { id } = router.query;
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshComponent, setRefreshComponent] = useState(false);

  const refreshData = () => {
    setRefreshComponent(!refreshComponent);
  };

  useEffect(() => {
    getHorarios();
  }, [refreshComponent]);

  const getHorarios = async () => {
    try {
      const response = await fetch("http://localhost:5000/horarios", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (response.ok) {
        setAuthenticated(true);
      } else {
        router.push("/login");
      }

      if (!response.ok) {
        router.push("/login");
        throw new Error("Error en el servidor");
      }
    } catch (error) {
      console.log("Error al verificar la autenticación:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : authenticated ? (
        <DataSocioProvider id={id} refreshData={refreshData} >
          <LayoutSocios
            refreshData={refreshData}
            titleMenu={<h3>Personal</h3>}
            titleTab1={<p>&nbsp;&nbsp;Perfil</p>}
            titleTab2={<p>Historial de clases</p>}
            titleTab3={<p>Agenda de clases</p>}
            tab1={<InfoBasica />}
            titlesInTab2={
              <div className={styles.container_titles}>
                <h2 className={styles.title}>Historial de clases</h2>
                <h3 className={styles.subtitle}>
                  Selecciona el mes y año para ver tu historial de clases
                </h3>
              </div>
            }
            tab2={<Historial />}
            tab3={<Agenda />}
          />
        </DataSocioProvider>
      ) : null}
    </>
  );
}
