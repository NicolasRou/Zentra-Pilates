import { createContext, useEffect, useState } from "react";

export const DataSocioContext = createContext();

export function DataSocioProvider({ children, id, refreshData }) {
  const [dataSocio, setDataSocio] = useState(null);
  console.log("ID en DataSocioProvider:", id);

  useEffect(() => {
    const getInfoSocio = async () => {
      try {
        const response = await fetch(`http://localhost:5000/socios/${id}`);
        const responseJson = await response.json();
        setDataSocio(responseJson.data);
        console.log(responseJson.data);
        // console.log(dataSocio[0])
      } catch (error) {
        console.log(error);
      }
    };

    getInfoSocio();
  }, [id, refreshData]);

  return (
    <DataSocioContext.Provider value={dataSocio}>
      {children}
    </DataSocioContext.Provider>
  );
}
