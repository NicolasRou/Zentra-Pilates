import { useEffect, useState, useContext } from "react";
import Historial from "./Historial";
import ModalAgenda from "./ModalAgenda";
import { DataSocioContext } from "@/contexts/dataSocio";
import AgendaCuponera from "./AgendaCuponera";
import ClaseSelector from "./ClaseSelector";
import styles from "@/styles/Socios/Agenda.module.css";
import swal from "sweetalert";
import { useRouter } from "next/router";
import Loader from "./Loader";

export default function Agenda() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHorario, setSelectedHorario] = useState("");
  const [horario, setHorario] = useState("");
  const [horarioDelete, setHorairoDelete] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedClase, setSelectedClase] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [enabledDays, setEnabledDays] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchHorarioConverted, setSearchHorarioConverted] = useState([]);
  const [searchHorarioOriginal, setSearchHorarioOriginal] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const { dataSocio } = useContext(DataSocioContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
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

  const viewHorarios = async () => {
    try {
      const clase = selectedClase;
      const diasemana = selectedDay;
      const mes = selectedMonth;
      console.log(diasemana);
      console.log(clase);
      console.log(mes);
      const response = await fetch(`http://localhost:5000/horas/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          clase: clase,
          diasemana: diasemana,
          mes: mes,
        }),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      setSearchHorarioConverted(responseJson.data.converted);
      setSearchHorarioOriginal(responseJson.data.original);
    } catch (error) {
      console.log("Error al obtener los horarios libres");
    }
  };

  const handleEdit = (horario, horarioFormated) => {
    setSelectedHorario(horarioFormated);
    const formattedHorario = fechadb(horario);
    setHorario(formattedHorario);
    setModalType("edit");
    console.log(horario);
  };

  const fechadb = (date) => {
    const fechaObj = new Date(date);
    if (isNaN(fechaObj.getTime())) {
      console.error("Fecha no válida:", date);
      return null;
    }
    // fechaObj.setUTCHours(fechaObj.getUTCHours() + 3);
    fechaObj.setMinutes(fechaObj.getMinutes() - fechaObj.getTimezoneOffset());
  

    const year = fechaObj.getUTCFullYear();
    const month = String(fechaObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(fechaObj.getUTCDate()).padStart(2, "0");
    const hours = String(fechaObj.getUTCHours()).padStart(2, "0");
    const minutes = String(fechaObj.getUTCMinutes()).padStart(2, "0");
    const seconds = String(fechaObj.getUTCSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };

  const handleDelete = (horario, horarioFormated) => {
    setSelectedHorario(horarioFormated);
    setHorairoDelete(horario);
    console.log(horario);
    setModalType("delete");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedHorario("");
    setShowResults(false);
  };

  const searchOpen = () => {
    viewHorarios();
    setShowResults(true);
  };
  const searchClose = () => {
    setShowResults(false);
  };

  const actionReplace = (index) => {
    swal({
      title: "¿Estás seguro?",
      text: "Esta acción modificará tus horarios.",
      icon: "warning",
      buttons: ["Cancelar", "Sí"],
      dangerMode: true,
    }).then(async (confirmed) => {
      if (confirmed) {
        setShowResults(false);

        try {
          const clase = selectedClase;
          const horaActual = horario;
          const horaSeleciconada = searchHorarioConverted[index];
          console.log(horaActual);
          console.log(horaSeleciconada);
          const data = await fetch(`http://localhost:5000/replace/${id}`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "auth-token": localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              clase: clase,
              horaActual: horaActual,
              horaSeleccionada: horaSeleciconada,
            }),
          });
          const dataJson = await data.json();
          console.log(dataJson);

          if (dataJson.success === true) {
            swal({
              icon: "success",
              title: "Horario modificado con éxito",
              timer: 1500,
            });
          }
        } catch (error) {
          console.log("Error");
        }
      }
    });
  };
  const deleteHorario = async (horarioDelete) => {
    try {
      const selectedDate = horarioDelete;
      console.log(selectedHorario);
      const deleteDate = await fetch(
        `http://localhost:5000/delete/${id}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            selectedDate: selectedDate,
          }),
        }
      );

      const deleteDateJson = await deleteDate.json();

      if (deleteDateJson.success === true) {
        swal({
          icon: "success",
          title: "Reserva eliminada con éxito",
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      alert("No se ha podido eliminar la reserva");
    }
  };
  return (
    <>
      <div
        className={
          modalType === "edit" || modalType === "delete" ? "blur" : "show"
        }
      >
        {dataSocio && dataSocio[0].plan === "Plan mensual fijo" && (
          <>
            <div className={styles.container_text}>
              <div className={styles.container_title}>
                <h2 className={styles.title}>Agenda de clases</h2>
              </div>
              <h3 className={styles.subtitle}>
                Podrás ver tus proximas clases y re-agendarlas.
              </h3>
              <p>
                Selecciona el mes de la clase que quieres ver o re-agendar
              </p>
              <Historial
                onEdit={handleEdit}
                onDelete={handleDelete}
                showButtons={true}
                showMesSelector={true}
                inputShow="ninguno"
                dataSocio={dataSocio}
                
              />
            </div>
          </>
        )}

        {dataSocio && dataSocio[0].plan === "cuponera" && <AgendaCuponera />}
      </div>

      <ModalAgenda
        isOpen={modalType === "edit"}
        handleClose={closeModal}
        title="Editar Horario"
        content={
          <>
            <div>
              <div>
                <p>Horario seleccionado: {selectedHorario}</p>
              </div>
              <ClaseSelector
                onClaseChange={handleClaseChange}
                onDayChange={handleDayChange}
                onMonthChange={handleMonthChange}
                showSelectMes={true}
                showSelectDia={true}
                onClick={searchOpen}
                buttonName={"Buscar"}
              />
            </div>
            {showResults ? (
              <div>
                <div
                  className={`${showResults ? styles.container_search : ""}`}
                >
                  <div className={styles.container_title}>
                    <h3>Resultados de la busqueda:</h3>
                  </div>
                  {searchHorarioConverted &&
                  searchHorarioConverted.length === 0 ? (
                    <h3 className={styles.subtitle2}>
                      Ya tienes agenda para la clase y dia seleccionados
                    </h3>
                  ) : (
                    <div>
                      <ul>
                        {searchHorarioOriginal.map((fecha, index) => (
                          <li key={index} className={styles.li}>
                            <input type="text" value={fecha} readOnly />
                            {searchHorarioConverted[index] && (
                              <button
                                className={styles.button}
                                onClick={() => {
                                  actionReplace(index);
                                }}
                              >
                                Seleccionar
                              </button>
                            )}
                            <button
                              onClick={searchClose}
                              className={styles.button}
                            >
                              Cancelar
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button onClick={searchClose} className={styles.button}>
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        }
      />

      <ModalAgenda
        isOpen={modalType === "delete"}
        handleClose={closeModal}
        title="Borrar Horario"
        content={
          <>
            <div className={styles.container_delete}>
              <p>Horario seleccionado: {selectedHorario}</p>
              <h3>¿Deseas borrar tu reserva en el horario seleccionado?</h3>
              <p>
                Para editar un horario que ya tienes reservado, por otro horario
                disponible, ve a "editar"
              </p>
            </div>
            <button
              onClick={() => {
                deleteHorario(horarioDelete);
              }}
              className={styles.delete}
            >
              Borrar
            </button>
          </>
        }
      />
      <style jsx>
        {`
          .blur {
            filter: blur(5px);
            opacity: 1;
            visibility: visible;
          }
          .show {
            filter: none;
          }
        `}
      </style>
    </>
  );
}
