import { useState, useEffect } from "react";
import swal from "sweetalert";

export default function Clases() {
  const [selectedDate, setSelectedDate] = useState("");
  const [availablehorarios, setAvailablehorarios] = useState([]);
  const [hora, setHora] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [clase, setClase] = useState("");
  const [alumno1, setAlumno1] = useState("");
  const [alumno2, setAlumno2] = useState("");
  const [alumno3, setAlumno3] = useState("");

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
      const response = await fetch("http://localhost:5000/clases", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          fecha: fecha,
        }),
      });

      const responseJson = await response.json();
      console.log(responseJson);
      const data = responseJson.data[0];
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
      setAlumno1(data.nombre_alumno1);
      setAlumno2(data.nombre_alumno2);
      setAlumno3(data.nombre_alumno3);

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

  return (
    <div>
      <div>
        <h2>Selecciona fecha y hora para ver los alumnos</h2>
      </div>
      <div>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      {availablehorarios.length > 0 && (
        <div>
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

      <div>
        <button onClick={onSearch}>Buscar</button>
      </div>

      {showResults ? (
        <div>
          <p>Clase: {clase}</p>
          <div>
            <h3>Alumnos agendados:</h3>
            <ul>
              <li>{alumno1}</li>
              <li>{alumno2}</li>
              <li>{alumno3}</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
