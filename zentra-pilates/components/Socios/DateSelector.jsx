import { useState, useEffect } from "react";
import styles from "@/styles/Socios/DateSelector.module.css";

export default function DateSelector({ onSearch, inputShow }) {
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
    const anioInicio = 2023;
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
      onSearch(startDateStr, endDateStr);
    }
  };

  return (
    <div className={styles.container_selector}>
      {inputShow !== "ninguno" && (
        <>
          {inputShow === "mes" || inputShow === "ambos" ? (
            <div className={styles.container_select}>
              <label htmlFor="meses">Mes:</label>
              <select
                id="meses"
                name="meses"
                onChange={handleMonthChange}
                className={styles.select}
              >
                {mesesOptions.map((option, index) => (
                  <option
                    key={index}
                    value={option.value}
                    className={styles.option}
                  >
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            "null"
          )}
          {inputShow === "año" || inputShow === "ambos" ? (
            <div className={styles.container_select}>
              <label htmlFor="year">Año:</label>
              <select
                id="year"
                name="year"
                onChange={handleYearChange}
                className={styles.select}
                required
              >
                {yearsOptions.map((option, index) => (
                  <option
                    key={index}
                    value={option.value}
                    className={styles.option}
                  >
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            "null"
          )}
        </>
      )}

      <button onClick={searchClases} className={styles.button}>
        Buscar
      </button>
    </div>
  );
}

export function MesSelector({ onSearch }) {
  const [mesesOptions, setMesesOptions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0);

  useEffect(() => {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
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
    const options = [
      { text: "Selecciona un mes", value: 0 },
      { text: `${meses[mesActual]}`, value: mesActual + 1 },
      {
        text: `${meses[(mesActual + 1) % 12]}`,
        value: (mesActual + 2) % 12 || 12,
      },
    ];

    setMesesOptions(options);
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const searchClases = () => {
    if (selectedMonth !== 0) {
      const fechaActual = new Date();
      const yearActual = fechaActual.getFullYear();
      const startDateStr = `${yearActual}-${selectedMonth
        .toString()
        .padStart(2, "0")}-01`;
      const endDateStr = new Date(yearActual, selectedMonth, 0)
        .toISOString()
        .split("T")[0];
      onSearch(startDateStr, endDateStr);
    }
  };

  return (
    <div className={styles.container_selector}>
      <div className={styles.container_select}>
        <label htmlFor="meses">Mes:</label>
        <select
          id="meses"
          name="meses"
          onChange={handleMonthChange}
          className={styles.select}
        >
          {mesesOptions.map((option, index) => (
            <option key={index} value={option.value} className={styles.option}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
      <button onClick={searchClases} className={styles.button}>
        Buscar
      </button>
    </div>
  );
}
