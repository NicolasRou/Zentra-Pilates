import { useEffect, useState } from "react";
import LayoutSocios from "../../components/Socios/LayoutSocios";
import { useRouter } from "next/router";
import { DataSocioProvider } from "@/contexts/dataSocio";

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
        <DataSocioProvider id={id} refreshData={refreshData}>
          <LayoutSocios refreshData={refreshData} />
        </DataSocioProvider>
      ) : null}
    </>
  );
}
