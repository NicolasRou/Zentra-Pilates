import { createContext, useEffect, useState, useContext } from "react";

export const DataSocioContext = createContext();

export function DataSocioProvider({ children, id, refreshData }) {
  const [dataSocio, setDataSocio] = useState(null);
  const [nombre, setNombre] = useState("");
  const [comentarios, setComentarios] = useState("");
  console.log("ID en DataSocioProvider:", id);

  useEffect(() => {
    const getInfoSocio = async () => {
      try {
        const response = await fetch(
          `https://zentra-pilates-production.up.railway.app/socios/${id}`
        );
        const responseJson = await response.json();
        setDataSocio(responseJson.data);
        setNombre(responseJson.data[0]?.nombre);
        setComentarios(responseJson.data[0]?.comentarios);
        console.log(responseJson.data);
      } catch (error) {
        console.log(error);
      }
    };

    getInfoSocio();
  }, [id, refreshData]);

  const contextValues = {
    dataSocio,
    nombre,
    comentarios,
  };

  return (
    <DataSocioContext.Provider value={contextValues}>
      {children}
    </DataSocioContext.Provider>
  );
}

export const useSocio = () => useContext(DataSocioContext);
