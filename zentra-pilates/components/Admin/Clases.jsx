import { useState, useEffect } from "react";
import swal from "sweetalert";
import styles from "@/styles/Admin/Clases.module.css";
import { useRouter } from "next/router";

export default function Clases() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [availablehorarios, setAvailablehorarios] = useState([]);
  const [hora, setHora] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [clase, setClase] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };

  const handleHourChange = (e) => {
    setHora(e.target.value);
  };

  useEffect(() => {
    const selectedDay = new Date(selectedDate).getDay();

    if (selectedDay === 5) {
      setAvailablehorarios(["11:00:00", "12:00:00"]);
    } else if (selectedDay === 6) {
      setAvailablehorarios([]);
    } else {
      setAvailablehorarios([
        "Selecciona un horario",
        "08:30:00",
        "09:00:00",
        "17:00:00",
        "18:30:00",
        "19:45:00",
        "20:45:00",
      ]);
    }
    if (setAvailablehorarios === "Selecciona un horario") {
      alert("Debes seleccionar un horario");
    }

    const selectedDateTime = `${selectedDate} ${hora}`;
    setDateTime(selectedDateTime);
    console.log(dateTime);
  }, [selectedDate, hora]);

  const getClases = async () => {
    try {
      const fecha = dateTime;
      console.log(fecha);
      const response = await fetch(
        "https://zentra-pilates-production.up.railway.app/clases",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            fecha: fecha,
          }),
        }
      );

      if (response.ok) {
        setIsLoading(false);
      }
      const responseJson = await response.json();
      console.log(responseJson);
      const data = responseJson.data[0];
      setAlumnos(responseJson.alumnos);
      console.log(responseJson.data);

      if (responseJson.data.length === 0) {
        swal({
          title: "Error",
          text: "No hay alumnos agendados para esta fecha",
          icon: "error",
          button: "Ok",
        });
        return;
      }
      setClase(responseJson.data[0].clase);

      if (!response.ok) {
        throw new Error(responseJson.message);
      }
    } catch (error) {
      console.log("Error al obtener las clases");
    }
  };

  const onSearch = () => {
    getClases();
    setShowResults(true);
  };

  const handleVerSocio = (ci) => {
    router.push(`/editar/${ci}`);
  };

  return (
    <section className={styles.container_clases}>
      <div className={styles.container_title}>
        <div className={styles.title}>
          <h2>Selecciona fecha y hora para ver los alumnos</h2>
        </div>
      </div>
      <div className={styles.container_info}>
        <div className={styles.container_inputs}>
          <div className={styles.input}>
            <label htmlFor="fecha">Selecciona fecha:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>

          {availablehorarios.length > 0 && (
            <div className={styles.input}>
              <label htmlFor="horairo">Selecciona un horario:</label>
              <select id="horairo" onChange={handleHourChange}>
                {availablehorarios.map((horario) => (
                  <option key={horario} value={horario}>
                    {horario}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button className={styles.button} onClick={onSearch}>
            Buscar
          </button>
        </div>

        {showResults ? (
          <div className={styles.container_results}>
            <h3 className={styles.subtitle}>Clase: {clase}</h3>
            <div>
              <h3 className={styles.subtitle}>Alumnos agendados:</h3>
              <ul className={styles.list}>
                {alumnos ? (
                  alumnos
                    .filter((alumno) => alumno && alumno.nombre)
                    .map((alumno, index) => (
                      <li key={index}>
                        <p>{alumno.nombre}</p>
                        <button
                          onClick={() => handleVerSocio(alumno.ci)}
                          className={styles.button}
                        >
                          Ver socio
                        </button>
                      </li>
                    ))
                ) : (
                  <p>No hay alumnos agendados para esta fecha</p>
                )}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
