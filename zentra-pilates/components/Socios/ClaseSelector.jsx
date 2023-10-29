import { useEffect, useState } from "react";
import styles from "@/styles/Socios/ClaseSelector.module.css";

export default function ClaseSelector({
  onClaseChange,
  onDayChange,
  onMonthChange,
  showSelectDia,
  showSelectMes,
  onClick,
  buttonName
}) {
  const [diasOptions, setDiasOptions] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [mesesOptions, setMesesOptions] = useState([]);
  const [selectedClase, setSelectedClase] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [enabledDays, setEnabledDays] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
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
      { text: meses[currentMonth - 1], value: currentMonth },
      { text: meses[nextMonth - 1], value: nextMonth },
    ];
    setMesesOptions(options);
  }, []);

  useEffect(() => {
    const dias = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];
    const options = [];
    options.push({ text: "Selecciona un dia", value: 0 });
    for (let i = 0; i < dias.length; i++) {
      const text = `${dias[i]} `;
      options.push({ text, value: i + 1 });
    }

    setDiasOptions(options);
  }, []);

  const clases = [
    { value: "Pilates", days: [1, 2, 3, 4, 5, 6] },
    { value: "Pilates stretching", days: [4, 5, 6] },
    { value: "Pilates funcional", days: [5] },
    { value: "TRX pilates", days: [1, 2, 4, 5] },
    { value: "Stretching", days: [1, 2, 6] },
    { value: "Funcional stretching", days: [3] },
  ];

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    onDayChange(e);
  };
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    onMonthChange(e);
  };

  const handleClase = (e) => {
    const clase = e.target.value;
    setSelectedClase(clase);
    const selectedClass = clases.find((c) => c.value === clase);
    if (selectedClass) {
      setSelectedDay(0);
      setEnabledDays(selectedClass.days);
    } else {
      setSelectedDay(0);
      setEnabledDays([]);
    }

    onClaseChange(clase);
  };
  return (
    <div className={styles.container_claseSelector}>
      <div className={styles.container_inputs}>
        <div className={styles.containerInput}>
          <label htmlFor="clases">Clase:</label>
          <select name="clases" id="clases" required onChange={handleClase}>
            <option value="0">Selecciona una clase</option>
            {clases.map((clase) => (
              <option key={clase.value} value={clase.value}>
                {clase.value}
              </option>
            ))}
          </select>
        </div>

        {showSelectDia && (
          <div className={styles.containerInput}>
            <label htmlFor="dia">
              Selecciona el dia (dependiendo de la clase
              elegida, los días disponibles)
            </label>
            <select name="dia" id="dia" required onChange={handleDayChange}>
              {diasOptions.map((option, index) => (
                <option
                  key={index}
                  value={option.value}
                  disabled={!enabledDays.includes(option.value)}
                >
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        )}

        {showSelectMes && (
          <div className={styles.containerInput}>
            <label htmlFor="meses">
              Selecciona el mes para programar la clase
            </label>
            <select name="meses" id="meses" onChange={handleMonthChange}>
              {mesesOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        )}
        <button onClick={onClick}>{buttonName}</button>
      </div>
    </div>
  );
}
