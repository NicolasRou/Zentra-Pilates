import { createContext, useEffect, useState } from "react";

export const DataSocioContext = createContext();

export function DataSocioProvider({ children, id, refreshData }) {
  const [dataSocio, setDataSocio] = useState(null);
  const [nombre, setNombre] = useState("");
  console.log("ID en DataSocioProvider:", id);

  useEffect(() => {
    const getInfoSocio = async () => {
      try {
        const response = await fetch(`http://localhost:5000/socios/${id}`);
        const responseJson = await response.json();
        setDataSocio(responseJson.data);
        setNombre(responseJson.data[0].nombre);
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
  };


  return (
    <DataSocioContext.Provider value={contextValues}>
      {children}
    </DataSocioContext.Provider>
  );
}
