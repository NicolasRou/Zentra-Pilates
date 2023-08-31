import { useEffect, useState, useContext } from "react";
import Historial from "./Historial";
import ModalAgenda from "./ModalAgenda";
import { DataSocioContext } from "@/contexts/dataSocio";
import AgendaCuponera from "./AgendaCuponera";
import ClaseSelector from "./ClaseSelector";
import styles from "@/styles/Socios/Agenda.module.css";
import swal from "sweetalert";
import { useRouter } from "next/router";

export default function Agenda() {
  const [loading, setLoading] = useState(false);
  const [selectedHorario, setSelectedHorario] = useState("");
  const [horario, setHorario] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedClase, setSelectedClase] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [enabledDays, setEnabledDays] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [searchHorarios, setSearchHorarios] = useState([]);
  const [replaceHorario, setReplaceHorario] = useState("");
  // const [selectedInputValue, setSelectedInputValue] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const dataSocio = useContext(DataSocioContext);

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
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

  const viewHorarios = async (req, res, next) => {
    try {
      setLoading(true);
      const clase = selectedClase;
      const diasemana = selectedDay;
      const mes = selectedMonth;
      console.log(diasemana);
      console.log(clase);
      console.log(mes);
      const response = await fetch("http://localhost:5000/horas", {
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
      setSearchHorarios(responseJson.data.converted);
      setReplaceHorario(responseJson.data.original);
      console.log(replaceHorario);
      console.log(searchHorarios);
    } catch (error) {
      console.log("Error al obtener los horarios libres");
    }
  };
  useEffect(() => {
    viewHorarios();
  }, []);

  const handleEdit = (horario, horarioFormated) => {
    setSelectedHorario(horarioFormated);
    setHorario(horario);
    setModalType("edit");
    console.log(horario);
  };

  const handleDelete = (horario, horarioFormated) => {
    setSelectedHorario(horarioFormated);
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

  const actionReplace = (replaceHorario) => {
    swal({
      title: "¿Estás seguro?",
      text: "Esta acción modificará tus horarios.",
      icon: "warning",
      buttons: ["Cancelar", "Sí"],
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        replaceHora(replaceHorario);
      }
    });
  };

  const replaceHora = async (selectedInputValue) => {
    try {
      const clase = selectedClase;
      const horaActual = horario;
      const horaSeleciconada = selectedInputValue;
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
  };
  return (
    <>
      <div
        className={
          modalType === "edit" || modalType === "delete" ? "blur" : "show"
        }
      >
        {dataSocio && dataSocio[0].plan === "mensual" && (
          <>
            <div className={styles.container_titles}>
              <h2 className={styles.title}>Agenda de clases</h2>
              <h3 className={styles.subtitle}>
                Podrás ver tus proximas clases, re-agendarlas, o borrarlas
              </h3>
              <p>
                Selecciona el mes de la clase que quieres ver, re-agendar o
                borrar:
              </p>
              <Historial
                onEdit={handleEdit}
                onDelete={handleDelete}
                showButtons={true}
                showMesSelector={true}
                inputShow="ninguno"
              />
            </div>
          </>
        )}

        {dataSocio && dataSocio[0].plan === "cuponera" && (
          <>
            <h2>Esto es si es cuponera</h2>
            <AgendaCuponera />
          </>
        )}
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
              />
              <div className={styles.container_button}>
                <button onClick={searchOpen}>Buscar</button>
              </div>
            </div>
            {showResults ? (
              <>
                <div
                  className={` ${showResults ? styles.container_search : ""} `}
                >
                  <div className={styles.container_title}>
                    <h3>Resultados de la busqueda:</h3>
                  </div>
                  <div>
                    <ul>
                      {searchHorarios.map((fecha, index) => (
                        <li key={index} className={styles.li}>
                          <input type="text" value={fecha} readOnly />
                          <button
                            className={styles.button}
                            onClick={() => {
                              // setSelectedInputValue(replaceHorario),
                              actionReplace(replaceHorario[index]);
                            }}
                          >
                            Seleccionar
                          </button>
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
                  <button onClick={searchClose} className={styles.button}>
                    Cancelar
                  </button>
                </div>
              </>
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
          <div>
            <p>Horario seleccionado: {selectedHorario}</p>
          </div>
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