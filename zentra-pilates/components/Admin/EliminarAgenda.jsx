import ClaseSelector from "../Socios/ClaseSelector";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { useRouter } from "next/router";

export default function EliminarAgenda() {
  const router = useRouter();
  const { id } = router.query;

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

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    console.log(selectedDay);
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
    console.log(selectedClase);
  };
  const eliminarClase = async () => {
    try {
      const ci = id;
      const clase = selectedClase;
      const diasemana = selectedDay;

      console.log(ci, clase, diasemana);
      const response = await fetch(
        "https://zentra-pilates-production.up.railway.app/eliminarClase",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            id: ci,
            clase: clase,
            diasemana: diasemana,
          }),
        }
      );

      const responseJson = await response.json();
      if (responseJson.success === true) {
        swal("Alumno eliminado con éxito!", {
          buttons: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log("Error:", error);
      swal({
        title: "Error",
        text: "No se ha podido eliminar al alumno",
        icon: "error",
        button: "Ok",
      });
    }
  };

  const handleClick = () => {
    console.log(id);
    console.log(selectedDay);
    console.log(selectedClase);
    swal({
      title: "¿Estás seguro?",
      text: `Esta acción eliminará al alumno en la clase seleccionada. Recordá seleccionar bien la clase! "Clase:" ${selectedClase} "`,
      icon: "warning",
      buttons: ["Cancelar", "Sí"],
      dangerMode: true,
    }).then(async (confirmed) => {
      if (confirmed) {
        eliminarClase();
      }
    });
  };

  return (
    <div>
      <ClaseSelector
        showSelectDia={true}
        onClaseChange={handleClase}
        onDayChange={handleDayChange}
        onClick={handleClick}
        buttonName={"Eliminar"}
      />
    </div>
  );
}
