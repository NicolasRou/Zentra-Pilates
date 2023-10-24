import { useState, useEffect } from "react";
import styles from "@/styles/Admin/EditAgenda.module.css";
import ClaseSelector from "../Socios/ClaseSelector";
import { useRouter } from "next/router";

export default function ReagendarFijo() {
  const router = useRouter();
  const { id } = router.query;
  const [availablehorarios, setAvailablehorarios] = useState([]);
  const [hora, setHora] = useState("");
  const [selectedClase, setSelectedClase] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [enabledDays, setEnabledDays] = useState([]);

  const clases = [
    { value: "Pilates", days: [1, 2, 3, 4, 5, 6] },
    { value: "Pilates stretching", days: [5, 6] },
    { value: "Pilates funcional", days: [5] },
    { value: "TRX pilates", days: [1, 2, 4, 5] },
    { value: "Stretching", days: [1, 2, 6] },
    { value: "Funcional stretching", days: [3] },
  ];

  const handleHourChange = (e) => {
    setHora(e.target.value);
  };
  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleClase = (clase) => {
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

  useEffect(() => {
    setAvailablehorarios([
      { label: "Selecciona un horario", value: "" },
      { label: "09:00:00", value: "09" },
      { label: "11:00:00", value: "11" },
      { label: "12:00:00", value: "12" },
      { label: "17:00:00", value: "17" },
      { label: "18:30:00", value: "18" },
      { label: "19:45:00", value: "19" },
      { label: "20:45:00", value: "20" },
    ]);

    if (setAvailablehorarios === "Selecciona un horario") {
      alert("Debes seleccionar un horario");
    }
  }, [selectedDay, hora]);

  const reagenda = async () => {
    try {
      const clase = selectedClase;
      const dia_semana = selectedDay;
      const horaSeleccionada = hora;
      const nuevo_valor = id;

      const response = await fetch("http://localhost:5000/agregarClase", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          clase: clase,
          dia_semana: dia_semana,
          hora: horaSeleccionada,
          nuevo_valor: nuevo_valor,
        }),
      });
      const responseJson = await response.json();
      if (responseJson.success === true) {
        swal("Alumno agendado con éxito!", {
          buttons: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log("Error:", error);
      swal({
        title: "Error",
        text: "No se ha podido agendar al alumno",
        icon: "error",
        button: "Ok",
      });
    }
  };

  const handleClick = () => {
    console.log(selectedClase, selectedDay, hora, id);
    swal({
      title: "¿Estás seguro?",
      text: `Esta acción modificará horarios del alumno. Recordá seleccionar bien el horario! "Clase:" ${selectedClase} "Horario: ${hora}"`,
      icon: "warning",
      buttons: ["Cancelar", "Sí"],
      dangerMode: true,
    }).then(async (confirmed) => {
      if (confirmed) {
        reagenda();
      }
    });
  };
  return (
    <div className={styles.hora}>
      {availablehorarios.length > 0 && (
        <div className={styles.input}>
          <label htmlFor="horairo">Selecciona un horario:</label>
          <select id="horairo" onChange={handleHourChange}>
            {availablehorarios.map((horario) => (
              <option key={horario.value} value={horario.value}>
                {horario.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <ClaseSelector
          showSelectDia={true}
          onClaseChange={handleClase}
          onDayChange={handleDayChange}
          onClick={handleClick}
          buttonName={"Reagendar"}
        />
      </div>
    </div>
  );
}
