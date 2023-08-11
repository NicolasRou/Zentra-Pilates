import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DateSelector from "./DateSelector";

export default function Historial({ onEdit, onDelete, showButtons }) {
  // const [mesesOptions, setMesesOptions] = useState([]);
  // const [yearsOptions, setYearsOptions] = useState([]);
  // const [selectedMonth, setSelectedMonth] = useState(0);
  // const [selectedYear, setSelectedYear] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [horarioFormated, setHorarioFormated] = useState([]);
  const [horario, setHorario] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   const meses = [
  //     "Enero",
  //     "Febrero",
  //     "Marzo",
  //     "Abril",
  //     "Mayo",
  //     "Junio",
  //     "Julio",
  //     "Agosto",
  //     "Septiembre",
  //     "Octubre",
  //     "Noviembre",
  //     "Diciembre",
  //   ];
  //   const options = [];
  //   options.push({ text: "Selecciona un mes", value: 0 });

  //   for (let i = 0; i < meses.length; i++) {
  //     const text = `${meses[i]} `;
  //     options.push({ text, value: i + 1 });
  //   }
  //   setMesesOptions(options);
  // }, []);

  // useEffect(() => {
  //   const fechaActual = new Date();
  //   const yearActual = fechaActual.getFullYear();
  //   const anioInicio = 2021;
  //   const options = [];

  //   for (let i = yearActual; i >= anioInicio; i--) {
  //     const text = `${i}`;
  //     options.push({ text, value: i });
  //   }

  //   options.unshift({ text: "Selecciona un año", value: 0 });

  //   setYearsOptions(options);
  // }, []);

  // const handleMonthChange = (e) => {
  //   setSelectedMonth(Number(e.target.value));
  // };
  // const handleYearChange = (e) => {
  //   setSelectedYear(Number(e.target.value));
  // };

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
      if (responseJson.data.original.length < 1) {
        console.log("No hay reservas en el historial con esta fecha");
      } else {
        console.log(responseJson.data.converted);
        console.log(responseJson.data.original);
        setHorarioFormated(responseJson.data.converted);
        setHorario(responseJson.data.original);
        console.log(startDate, endDate);
      }
    } catch (error) {
      console.log("error al obtener horarios");
    }
  };

  // const searchClases = () => {
  //   if (selectedMonth !== 0 && selectedYear !== 0) {
  //     const startDateStr = `${selectedYear}-${selectedMonth
  //       .toString()
  //       .padStart(2, "0")}-01`;
  //     const endDateStr = new Date(selectedYear, selectedMonth, 0)
  //       .toISOString()
  //       .split("T")[0];

  //     setStartDate(startDateStr);
  //     setEndDate(endDateStr);
  //   }
  // };

  useEffect(() => {
    if (startDate && endDate) {
      getHorarios();
    }
  }, [startDate, endDate]);

  const currentTimestamp = Date.now();

  return (
    <>
      {/* <div>
        <h2>Historial de clases</h2>
      </div>
      <div>
        <h3>Seleccioná el mes para ver tu historial de clases</h3>
      </div>
      <div>
        <label htmlFor="meses">Selecciona un mes:</label>
        <select id="meses" name="meses" onChange={handleMonthChange}>
          {mesesOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="year">Selecciona un año:</label>
        <select id="year" name="year" onChange={handleYearChange}>
          {yearsOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>

      <button onClick={searchClases}>Buscar</button> */}

      <div>
        <h2>Historial de clases</h2>
      </div>
      <div>
        <h3>Seleccioná el mes para ver tu historial de clases</h3>
      </div>
      <DateSelector onSearch={getHorarios} />

      <ul>
        {/* {horarioFormated.map((hora, index) => (
          <li key={index}>
            <input type="text" value={hora} readOnly />
            {showButtons && (
              <>
                <button
                  onClick={() => onEdit(horario[index], horarioFormated[index])}
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
        ))} */}

        {horarioFormated.map((hora, index) => {
          const horarioTimestamp = new Date(horario[index]).getTime();
          const isPastDate = horarioTimestamp > currentTimestamp;

          return (
            <li key={index}>
              <input type="text" value={hora} readOnly />
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
      </ul>
    </>
  );
}
