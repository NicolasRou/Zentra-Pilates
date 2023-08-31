import { useState, useEffect } from "react";
import ClaseSelector from "./ClaseSelector";

export default function AgendaCuponera() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedClase, setSelectedClase] = useState(null);
  const [enabledDays, setEnabledDays] = useState([]);

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const clases = [
    { value: "Pilates", days: [1, 2, 3, 4, 5, 6] },
    { value: "Pilates stretching", days: [5, 6] },
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
      console.log(diasemana);

      const response = await fetch("http://localhost:5000/disponibles", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          clase: clase,
        }),
      });

      const responseJson = await response.json();
      console.log(responseJson.data);
    } catch (error) {
      console.error("Error:", error);
      console.log("Error al obtener los horarios disponibles");
    }
  };
  useEffect(() => {
    horariosDisponibles();
  }, []);

  return (
    <div>
      <div>
        <h2>Agenda de clases</h2>
        <h3>Aquí podrás agendarte a las clases de tu cuponera</h3>
        <p>
          Recordá que para poder agendar a una clase, debe ser mínimo con 24hs
          de antelación, y como máximo una semana antes de la clase.
        </p>
      </div>
      <ClaseSelector
        onClaseChange={handleClaseChange}
        onDayChange={handleDayChange}
        showSelectDia={false}
        showSelectMes={false}
      />
      <button onClick={horariosDisponibles}>Buscar</button>
    </div>
  );
}
