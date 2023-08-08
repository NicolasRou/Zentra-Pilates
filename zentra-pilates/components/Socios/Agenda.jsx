import Historial from "./Historial";

export default function Agenda() {
  return (
    <>
      <h2>Agenda de clases</h2>
      <h3>Ver agenda de clases</h3>

      <p>Aqui podras ver tus proximas clases:</p>
      <Historial
        onEdit={handleEdit}
        onDelete={handleDelete}
        showButtons={true} // Mostrar los botones en el componente Agenda
      />

      <p>Cancelar una clase</p>
      <p>Reponer una clase (en base a disponibilidad)</p>
    </>
  );
}
