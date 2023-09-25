import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DateSelector, { MesSelector } from "./DateSelector";
import styles from "@/styles/Socios/Historial.module.css";

export default function Historial({
  onEdit,
  onDelete,
  showButtons,
  showMesSelector,
  inputShow,
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [horarioFormated, setHorarioFormated] = useState([]);
  const [horario, setHorario] = useState([]);
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getHorarios = async (startDate, endDate) => {
    try {
      const response = await fetch(`http://localhost:5000/horarios/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          clientId: id,
          startDate: startDate,
          endDate: endDate,
        }),
      });

      const responseJson = await response.json();
      setData(responseJson.data);
      if (responseJson.data.original.length < 1) {
        setHorarioFormated([]);
        setHorario([]);
        console.log("No hay reservas en el historial con esta fecha");
      } else {
        console.log(responseJson.data.converted);
        console.log(responseJson.data.original);
        setHorarioFormated(responseJson.data.converted);
        setHorario(responseJson.data.original);
      }
    } catch (error) {
      console.log("error al obtener horarios");
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      getHorarios();
    }
  }, [startDate, endDate]);

  const currentTimestamp = Date.now();

  return (
    <div className={styles.container_historial}>
      <div className={styles.datosHistorial}>
        {inputShow !== "ninguno" && (
          <DateSelector onSearch={getHorarios} inputShow={"ambos"} />
        )}
        {data && data.original && data.original.length < 1 && (
          <h2 className={styles.subtitle}>
            No hay reservas en el historial con esta fecha
          </h2>
        )}
        {showMesSelector && <MesSelector onSearch={getHorarios} />}
        <ul className={styles.ul}>
          {horarioFormated.length > 0 ? (
            <div className={styles.container_resultados}>
              <h4>Aquí estan los resultados</h4>
              {horarioFormated.map((hora, index) => {
                const horarioTimestamp = new Date(horario[index]).getTime();
                const isPastDate = horarioTimestamp > currentTimestamp;

                return (
                  <li key={index} className={styles.li}>
                    <input
                      type="text"
                      value={hora.charAt(0).toUpperCase() + hora.slice(1)}
                      readOnly
                    />
                    {showButtons && isPastDate && (
                      <>
                        <button
                          onClick={() =>
                            onEdit(horario[index], horarioFormated[index])
                          }
                        >
                          Editar
                        </button>
                        <button
                          onClick={() =>
                            onDelete(horario[index], horarioFormated[index])
                          }
                        >
                          Borrar
                        </button>
                      </>
                    )}
                  </li>
                );
              })}
            </div>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
