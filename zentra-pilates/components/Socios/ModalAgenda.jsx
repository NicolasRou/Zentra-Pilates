export default function ModalAgenda({ isOpen, handleClose, title, content }) {
  return (
    isOpen && (
      <div>
        <div>
          <h2>{title}</h2>
        </div>
        <div>{content}</div>
        <div>
          <button onClick={handleClose}>Cerrar</button>
        </div>
      </div>
    )
  );
}
