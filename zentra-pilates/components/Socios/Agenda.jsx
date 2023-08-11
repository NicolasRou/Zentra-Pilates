import { useState } from "react";
import Historial from "./Historial";
import ModalAgenda from "./ModalAgenda";
import DateSelector from "./DateSelector";

export default function Agenda() {
  const [selectedHorario, setSelectedHorario] = useState("");
  const [modalType, setModalType] = useState(null);
  const [claseSelected, setClaseSelected] = useState(null);
  const handleClase = (e) => {
    setClaseSelected(e.target.value);
  };

  const handleEdit = (horario, horarioFormated) => {
    setSelectedHorario(horarioFormated);
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
  };

  const viewHorarios = async (req, res, next) => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <h2>Agenda de clases</h2>
      <h3>Ver agenda de clases</h3>
      <p>Aqui podras ver tus proximas clases:</p>
      <Historial
        onEdit={handleEdit}
        onDelete={handleDelete}
        showButtons={true}
      />

      <ModalAgenda
        isOpen={modalType === "edit"}
        handleClose={closeModal}
        title="Editar Horario"
        content={
          <div>
            <div>
              <p>Horario seleccionado: {selectedHorario}</p>
              <p>
                Selecciona la clase a la que quieres asistir (Pilates, TRX,
                Stretching, etc)
              </p>
            </div>
            <div>
              <label htmlFor="clases"></label>
              <select name="clases" id="clases" required onChange={handleClase}>
                <option value="Pilates">Pilates</option>
                <option value="Pilates stretching">Pilates stretching</option>
                <option value="Pilates funcional">Pilates funcional</option>
                <option value="Pilates TRX">Pilates TRX</option>
                <option value="TRX">TRX</option>
                <option value="TRX pilates">TRX pilates</option>
                <option value="Stretching">Stretching</option>
                <option value="Funcional stretching">
                  Funcional stretching
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="dia">Selecciona el dia que buscas asistir</label>
              <select name="dia" id="dia" required>
                <option value="1">Lunes</option>
                <option value="2">Martes</option>
                <option value="3">Miercoles</option>
                <option value="4">Jueves</option>
                <option value="5">Viernes</option>
                <option value="6">Sabado</option>
              </select>
            </div>
            <div>
              <DateSelector />
            </div>
          </div>
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
    </>
  );
}
