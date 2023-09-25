import { useEffect, useState } from "react";
import swal from "sweetalert";
import LayoutSocios from "../../components/Socios/LayoutSocios";
import Clases from "../../components/Admin/Clases";
import Socios from "../../components/Admin/Socios";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } else {
        router.push("/login");
      }

      if (!response.ok) {
        router.push("/login");
        throw new Error("Error en el servidor");
      }
    } catch (error) {
      console.log("Error al verificar la autenticación:", error);
      swal({
        title: "Error de autenticación",
        text: "Debes acceder a tu cuenta",
        icon: "error",
        button: "Ok",
      });
      return;
    }
  };
  return (
    <>
      {isLoading ? (
        <p>Cargando...</p>
      ) : authenticated ? (
        <>
          <LayoutSocios
            titleMenu={<p>Consultas</p>}
            titleTab1={<p>&nbsp;&nbsp;Clases</p>}
            titleTab2={<p>Editar info socios</p>}
            titleTab3={<p>Comentarios a socios</p>}
            tab1={<Clases />}
            tab2={<Socios />}
          />
          <h2>Hola esto es admin</h2>
        </>
      ) : null}
    </>
  );
}
