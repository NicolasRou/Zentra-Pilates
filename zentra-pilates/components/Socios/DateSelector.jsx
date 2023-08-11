import { useState, useEffect } from "react";

export default function DateSelector({ onSearch }) {
  const [mesesOptions, setMesesOptions] = useState([]);
  const [yearsOptions, setYearsOptions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);

  useEffect(() => {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const options = [];
    options.push({ text: "Selecciona un mes", value: 0 });

    for (let i = 0; i < meses.length; i++) {
      const text = `${meses[i]} `;
      options.push({ text, value: i + 1 });
    }
    setMesesOptions(options);
  }, []);

  useEffect(() => {
    const fechaActual = new Date();
    const yearActual = fechaActual.getFullYear();
    const anioInicio = 2021;
    const options = [];

    for (let i = yearActual; i >= anioInicio; i--) {
      const text = `${i}`;
      options.push({ text, value: i });
    }

    options.unshift({ text: "Selecciona un año", value: 0 });

    setYearsOptions(options);
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };
  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const searchClases = () => {
    if (selectedMonth !== 0 && selectedYear !== 0) {
      const startDateStr = `${selectedYear}-${selectedMonth
        .toString()
        .padStart(2, "0")}-01`;
      const endDateStr = new Date(selectedYear, selectedMonth, 0)
        .toISOString()
        .split("T")[0];

      //   setStartDate(startDateStr);
      //   setEndDate(endDateStr);
      onSearch(startDateStr, endDateStr);
    }
  };

  return (
    <>
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

      <button onClick={searchClases}>Buscar</button>
    </>
  );
}
