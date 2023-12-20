import { useState, useEffect } from "react";
import ClaseSelector from "./ClaseSelector";
import styles from "@/styles/Socios/AgendaCuponera.module.css";
import { useRouter } from "next/router";
import Loader from "./Loader";

export default function AgendaCuponera() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedClase, setSelectedClase] = useState(null);
  const [enabledDays, setEnabledDays] = useState([]);
  const [dateAvailable, setDateAvailable] = useState("");
  const [hourAvailable, setHourAvailable] = useState("");
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const clases = [
    { value: "Pilates", days: [1, 2, 3, 4, 5] },
    { value: "Pilates stretching", days: [4, 5, 6] },
    { value: "Pilates funcional", days: [5] },
    { value: "Pilates TRX", days: [2] },
    { value: "TRX", days: [1] },
    { value: "TRX pilates", days: [4, 5] },
    { value: "Stretching", days: [1, 2, 6] },
    { value: "Funcional stretching", days: [3] },
  ];

  const handleClaseChange = (clase) => {
    setSelectedClase(clase);
    const selectedClass = clases.find((c) => c.value === clase);
    if (selectedClass) {
      setSelectedDay(0);
      setEnabledDays(selectedClass.days);
    } else {
      setSelectedDay(0);
      setEnabledDays([]);
    }
  };

  const horariosDisponibles = async () => {
    try {
      const clase = selectedClase;
      const diasemana = selectedDay;
      const idSocio = id;
      console.log(diasemana);

      const response = await fetch(`http://localhost:5000/disponibles/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          clase: clase,
          id: idSocio,
        }),
      });

      const responseJson = await response.json();
      setData(responseJson.data);
      setHourAvailable(data.original);
      console.log(responseJson.data);

      if (data && data.original && data.original.length > 0) {
        setDateAvailable(data.original);
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("Error al obtener los horarios disponibles");
    }
  };

  const selectDate = async (dateAvailable) => {
    try {
      const idSocio = id;
      if (!dateAvailable || typeof dateAvailable !== "string") {
        console.error("Error: Fecha no válida");
        return;
      }

      const fecha = formatDate(dateAvailable);
      console.log("Fecha formateada:", fecha);

      const response = await fetch(`http://localhost:5000/agendar/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          id: idSocio,
          fecha: fecha,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al agendar la clase: ${response.statusText}`);
      }

      const responseJson = await response.json();
      console.log(responseJson);
      console.log("Agendado con exito");
    } catch (error) {
      console.error("Error al agendar la clase:", error);
    }
  };

  const formatDate = (inputDateString) => {
    console.log("inputDateString en formatDate:", inputDateString);
    // Obtén los componentes de la fecha de la cadena de entrada
    if (!inputDateString) {
      console.error("Error: inputDateString is undefined or null");
      return null; // Otra acción adecuada en tu caso
    }
    const dateComponents = inputDateString.split(", ")[1]?.split("/");
    if (!dateComponents || dateComponents.length !== 3) {
      console.error(
        "Error: dateComponents is undefined or has incorrect format"
      );
      return null; // Otra acción adecuada en tu caso
    }
    const year = dateComponents[2];
    const month = dateComponents[1];
    const day = dateComponents[0];

    // Formatea la cadena de fecha en el formato deseado (YYYY-MM-DD)
    const formattedDate = `${year}-${month}-${day}`;

    // Obtén la hora de la cadena de entrada
    const time = inputDateString.split(", ")[2];

    // Formatea la cadena completa en el formato final (YYYY-MM-DDTHH:mm:ss)
    const finalFormattedDate = `${formattedDate}T${time}:00`;

    return finalFormattedDate;
  };

  return (
    <div>
      <div className={styles.container_text}>
        <div className={styles.container_title}>
          <h2 className={styles.title}>Agenda de clases</h2>
        </div>
        <div>
          <h3 className={styles.subtitle}>
            Aquí podrás agendarte a las clases de tu cuponera
          </h3>
          <p>
            Recordá que para poder agendar a una clase, debe ser mínimo con 24hs
            de antelación, y como maximo podés agendar hasta el próximo sábado.
          </p>
        </div>
      </div>
      <div>
        <h3 className={styles.subtitle}>
          Selecciona la clase a la que quieres asistir (Pilates, TRX,
          Stretching, etc)
        </h3>
      </div>
      <div className={styles.container}>
        <div className={styles.container_selector}>
          <ClaseSelector
            onClaseChange={handleClaseChange}
            onDayChange={handleDayChange}
            showSelectDia={false}
            showSelectMes={false}
            onClick={horariosDisponibles}
            buttonName={"Buscar"}
          />
        </div>
        <div className={styles.container_results}>
          {data && data.original && data.original.length > 0 ? (
            <div className={styles.container_resultados}>
              <h4>Aquí estan los resultados</h4>
              {data.original.map((hora, index) => (
                <li key={index} className={styles.li}>
                  <input
                    type="text"
                    value={hora.charAt(0).toUpperCase() + hora.slice(1)}
                    readOnly
                  />
                  <button
                    onClick={() => {
                      if (data && data.original && data.original.length > 0) {
                        selectDate(data.original[index]);
                      }
                    }}
                  >
                    Agendar
                  </button>
                </li>
              ))}
            </div>
          ) : data && data.original && data.original.length < 1 ? (
            <div className={styles.container_resultados}>
              <h3 className={styles.subtitle}>No hay cupos disponibles</h3>
            </div>
          ) : null}{" "}
        </div>
      </div>
    </div>
  );
}
