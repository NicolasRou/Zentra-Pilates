import { useContext } from "react";
import { DataSocioContext } from "@/contexts/dataSocio";

export default function InfoBasica() {
  const dataSocio = useContext(DataSocioContext);

  return (
    <>
      <div>
        <div>
          <h2>Información básica</h2>
        </div>
        <div>
          <h4>Nombre:</h4>
          <p>{dataSocio && dataSocio[0].name}</p>
          <h4>C.I</h4>
          <p>{dataSocio && dataSocio[0].id_socios}</p>
          <h4>Correo electronico</h4>
          <p>{dataSocio && dataSocio[0].mail}</p>
        </div>
      </div>
    </>
  );
}
