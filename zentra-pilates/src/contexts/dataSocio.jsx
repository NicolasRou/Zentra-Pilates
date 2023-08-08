import { createContext, useEffect, useState } from "react";

export const DataSocioContext = createContext();

export function DataSocioProvider({ children, id }) {
  const [dataSocio, setDataSocio] = useState(null);

  useEffect(() => {
    const getInfoSocio = async () => {
      try {
        const response = await fetch(`http://localhost:5000/socios/${id}`);
        const responseJson = await response.json();
        setDataSocio(responseJson.data);
        console.log(responseJson.data);
      } catch (error) {
        console.log(error);
      }
    };

    getInfoSocio();
  }, [id]);

  return (
    <DataSocioContext.Provider value={dataSocio}>
      {children}
    </DataSocioContext.Provider>
  );
}
