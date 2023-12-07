import { DataSocioContext } from "@/contexts/dataSocio";
import { useContext, useState, useEffect } from "react";
import Loader from "../Socios/Loader";
import Link from "next/link";
import styles from "@/styles/Admin/EditSocio.module.css";
import { useRouter } from "next/router";
import swal from "sweetalert";

export default function EditSocio() {
  const { dataSocio } = useContext(DataSocioContext);
  const router = useRouter();
  const { id } = router.query;

  const [datos, setDatos] = useState({
    nombre: "",
    ci: "",
    pass: "",
    mail: "",
    fechanacimiento: "",
    sociedad: "",
    patologias: "",
    consideraciones: "",
    plan: "",
    contacto: "",
    embarazo: "",
    planfijo: "",
    cuponera: "",
    estado: "",
    pago: "",
    comentarios: "",
  });

  const [edicion, setEdicion] = useState({
    nombre: false,
    ci: false,
    pass: false,
    mail: false,
    fechanacimiento: false,
    sociedad: false,
    patologias: false,
    consideraciones: false,
    plan: false,
    contacto: false,
    embarazo: false,
    planfijo: false,
    cuponera: false,
    estado: false,
    pago: false,
    comentarios: false,
  });

  useEffect(() => {
    if (dataSocio && dataSocio.length > 0) {
      setDatos({
        nombre: dataSocio[0].nombre || "",
        ci: dataSocio[0].ci || "",
        pass: dataSocio[0].pass || "",
        mail: dataSocio[0].mail || "",
        fechanacimiento: dataSocio[0].fechanacimiento || "",
        sociedad: dataSocio[0].sociedad || "",
        patologias: dataSocio[0].patologias || "",
        consideraciones: dataSocio[0].consideraciones || "",
        plan: dataSocio[0].plan || "",
        contacto: dataSocio[0].contacto || "",
        embarazo: dataSocio[0].embarazo || "",
        planfijo: dataSocio[0].planfijo || "",
        cuponera: dataSocio[0].cuponera || "",
        estado: dataSocio[0].estado || "",
        pago: dataSocio[0].pago || "",
        comentarios: dataSocio[0].comentarios || "",
      });
    }
  }, [dataSocio]);

  const handleEditar = (campo) => {
    const nuevoEstadoEdicion = { ...edicion };
    nuevoEstadoEdicion[campo] = true;
    setEdicion(nuevoEstadoEdicion);
  };
  const handlechange = (campo, nuevoValor) => {
    setDatos({
      ...datos,
      [campo]: nuevoValor,
    });
  };

  const handleGuardar = (campo) => {
    const nuevoEstadoEdicion = { ...edicion };
    nuevoEstadoEdicion[campo] = false;
    setEdicion(nuevoEstadoEdicion);

    enviarDatos(campo, datos[campo], id);
  };

  const enviarDatos = async (campo, nuevoValor, ci) => {
    try {
      const requestBody = {
        ci: ci,
        fieldsToUpdate: {
          [campo]: nuevoValor,
        },
      };
      console.log(campo, nuevoValor, ci);
      const response = await fetch(
        "https://zentra-pilates-production.up.railway.app/editSocio",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("jwt"),
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.ok) {
        swal("Socio modificado con éxito!", {
          buttons: false,
          timer: 1500,
        });
      } else {
        swal({
          title: "Error",
          text: "Error al actualizar los datos",
          icon: "error",
          button: "Ok",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.span}>
        <Link href={"/admin"}>Volver</Link>
      </span>
      <div className={styles.container_title}>
        <h1>Editar datos de socio</h1>
      </div>
      {!dataSocio ? (
        <Loader />
      ) : (
        <div className={styles.container_inputs}>
          <div>
            <label className={styles.label_input}>
              Nombre:
              {edicion.nombre ? (
                <input
                  type="text"
                  value={datos.campo1}
                  onChange={(e) => handlechange("nombre", e.target.value)}
                />
              ) : (
                <input type="text" value={datos.nombre} disabled />
              )}
              <button onClick={() => handleEditar("nombre")}>Editar</button>
              {edicion.nombre && (
                <button onClick={() => handleGuardar("nombre")}>Guardar</button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Cedula de identidad:
              {edicion.ci ? (
                <input
                  type="number"
                  max={8}
                  value={datos.ci}
                  onChange={(e) => handlechange("ci", e.target.value)}
                />
              ) : (
                <input type="number" value={datos.ci} disabled />
              )}
              <button onClick={() => handleEditar("ci")}>Editar</button>
              {edicion.ci && (
                <button onClick={() => handleGuardar("ci")}>Guardar</button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Estado:
              {edicion.estado ? (
                <input
                  type="text"
                  value={datos.estado}
                  onChange={(e) => handlechange("estado", e.target.value)}
                />
              ) : (
                <input type="text" value={datos.estado} disabled />
              )}
              <button onClick={() => handleEditar("estado")}>Editar</button>
              {edicion.estado && (
                <button onClick={() => handleGuardar("estado")}>Guardar</button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Contraseña:
              {edicion.pass ? (
                <input
                  type="text"
                  value={datos.pass}
                  onChange={(e) => handlechange("pass", e.target.value)}
                />
              ) : (
                <input type="text" value={datos.pass} disabled />
              )}
              <button onClick={() => handleEditar("pass")}>Editar</button>
              {edicion.pass && (
                <button onClick={() => handleGuardar("pass")}>Guardar</button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Mail:
              {edicion.mail ? (
                <input
                  type="mail"
                  value={datos.mail}
                  onChange={(e) => handlechange("mail", e.target.value)}
                />
              ) : (
                <input type="mail" value={datos.mail} disabled />
              )}
              <button onClick={() => handleEditar("mail")}>Editar</button>
              {edicion.mail && (
                <button onClick={() => handleGuardar("mail")}>Guardar</button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Fecha de nacimiento:
              {edicion.fechanacimiento ? (
                <input
                  type="text"
                  value={datos.fechanacimiento}
                  onChange={(e) =>
                    handlechange("fechanacimiento", e.target.value)
                  }
                />
              ) : (
                <input type="text" value={datos.fechanacimiento} disabled />
              )}
              <button onClick={() => handleEditar("fechanacimiento")}>
                Editar
              </button>
              {edicion.fechanacimiento && (
                <button onClick={() => handleGuardar("fechanacimiento")}>
                  Guardar
                </button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Sociedad:
              {edicion.sociedad ? (
                <input
                  type="text"
                  value={datos.sociedad}
                  onChange={(e) => handlechange("sociedad", e.target.value)}
                />
              ) : (
                <input type="text" value={datos.sociedad} disabled />
              )}
              <button onClick={() => handleEditar("sociedad")}>Editar</button>
              {edicion.sociedad && (
                <button onClick={() => handleGuardar("sociedad")}>
                  Guardar
                </button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Patologías:
              {edicion.patologias ? (
                <input
                  type="text"
                  value={datos.patologias}
                  onChange={(e) => handlechange("patologias", e.target.value)}
                />
              ) : (
                <input type="text" value={datos.patologias} disabled />
              )}
              <button onClick={() => handleEditar("patologias")}>Editar</button>
              {edicion.patologias && (
                <button onClick={() => handleGuardar("patologias")}>
                  Guardar
                </button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Consideraciones:
              {edicion.consideraciones ? (
                <input
                  type="text"
                  value={datos.consideraciones}
                  onChange={(e) =>
                    handlechange("consideraciones", e.target.value)
                  }
                />
              ) : (
                <input type="text" value={datos.consideraciones} disabled />
              )}
              <button onClick={() => handleEditar("consideraciones")}>
                Editar
              </button>
              {edicion.consideraciones && (
                <button onClick={() => handleGuardar("consideraciones")}>
                  Guardar
                </button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Plan:
              {edicion.plan ? (
                <input
                  type="text"
                  value={datos.plan}
                  onChange={(e) => handlechange("plan", e.target.value)}
                />
              ) : (
                <input type="text" value={datos.plan} disabled />
              )}
              <button onClick={() => handleEditar("plan")}>Editar</button>
              {edicion.plan && (
                <button onClick={() => handleGuardar("plan")}>Guardar</button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Contacto:
              {edicion.contacto ? (
                <input
                  type="text"
                  value={datos.contacto}
                  onChange={(e) => handlechange("contacto", e.target.value)}
                />
              ) : (
                <input type="text" value={datos.contacto} disabled />
              )}
              <button onClick={() => handleEditar("contacto")}>Editar</button>
              {edicion.contacto && (
                <button onClick={() => handleGuardar("contacto")}>
                  Guardar
                </button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Embarazo (semanas):
              {edicion.embarazo ? (
                <input
                  type="text"
                  value={datos.embarazo}
                  onChange={(e) => handlechange("embarazo", e.target.value)}
                />
              ) : (
                <input type="text" value={datos.embarazo} disabled />
              )}
              <button onClick={() => handleEditar("embarazo")}>Editar</button>
              {edicion.embarazo && (
                <button onClick={() => handleGuardar("embarazo")}>
                  Guardar
                </button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Plan Fijo (clases semanales):
              {edicion.planfijo ? (
                <input
                  type="text"
                  value={datos.planfijo}
                  onChange={(e) => handlechange("planfijo", e.target.value)}
                />
              ) : (
                <input type="text" value={datos.planfijo} disabled />
              )}
              <button onClick={() => handleEditar("planfijo")}>Editar</button>
              {edicion.planfijo && (
                <button onClick={() => handleGuardar("planfijo")}>
                  Guardar
                </button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Cuponera (cantidad contratada):
              {edicion.cuponera ? (
                <input
                  type="number"
                  value={datos.cuponera}
                  onChange={(e) => handlechange("cuponera", e.target.value)}
                />
              ) : (
                <input type="number" value={datos.cuponera} disabled />
              )}
              <button onClick={() => handleEditar("cuponera")}>Editar</button>
              {edicion.cuponera && (
                <button onClick={() => handleGuardar("cuponera")}>
                  Guardar
                </button>
              )}
            </label>
          </div>

          <div>
            <label className={styles.label_input}>
              Pago:
              {edicion.pago ? (
                <input
                  type="text"
                  value={datos.pago}
                  onChange={(e) => handlechange("pago", e.target.value)}
                />
              ) : (
                <input type="text" value={datos.pago} disabled />
              )}
              <button onClick={() => handleEditar("pago")}>Editar</button>
              {edicion.pago && (
                <button onClick={() => handleGuardar("pago")}>Guardar</button>
              )}
            </label>
          </div>
          <div>
            <label className={styles.label_input}>
              Comentarios:
              {edicion.comentarios ? (
                <textarea
                  type="text"
                  value={datos.comentarios}
                  onChange={(e) => handlechange("comentarios", e.target.value)}
                />
              ) : (
                <textarea type="text" value={datos.comentarios} disabled />
              )}
              <button onClick={() => handleEditar("comentarios")}>
                Editar
              </button>
              {edicion.comentarios && (
                <button onClick={() => handleGuardar("comentarios")}>
                  Guardar
                </button>
              )}
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
