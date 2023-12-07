export default function Inscripcion() {
  return (
    <>
      <div>
        <h1>Inscripción</h1>
      </div>
      <div>
        <h3>Completa los campos para inscribirte a tu primera clase</h3>
      </div>
      <section>
        <form>
          <ul>
            <li>
              <label>
                Nombre completo:
                <input type="text" required={true} />
              </label>
            </li>
            <li>
              <label>
                Cédula de identidad:
                <input type="number" max={8} required={true} />
              </label>
            </li>
            <li>
              <label>
                Fecha de nacimiento:
                <input type="date"required={true} />
              </label>
            </li>
            <li>
              <label>
                Mail
                <input type="mail" required={true}/>
              </label>
            </li>
            <li>
              <label>
                Sociedad médica:
                <input type="text" />
              </label>
            </li>
            <li>
              <label>
                Patologías:
                <input type="text" />
              </label>
            </li>
            <li>
              <label>
                Consideraciones:
                <input type="text" />
              </label>
            </li>
            <li>
              <label>
                Contacto:
                <input type="number" required={true} max={9}/>
              </label>
            </li>
            <li>
              <label>
                Clases mensuales:
                <input type="number" required />
              </label>
            </li>
            <li>
              <label>
                Embarazo (en caso de embarazo, indicar semana):
                <input type="text" />
              </label>
            </li>
          </ul>
          <button type="submit">Enviar</button>
        </form>
      </section>
    </>
  );
}
