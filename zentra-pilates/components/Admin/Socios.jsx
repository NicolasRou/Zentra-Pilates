import { useState, useEffect } from "react";
import Loader from "../Socios/Loader";
import Link from "next/link";
import styles from "@/styles/Admin/Socios.module.css";

export default function Socios() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSearch = () => {
    if (!inputValue.trim()) {
      alert("Escribe datos del socio que quieres buscar");
    } else {
      setIsLoading(true);
      searchSocio();
    }
  };

  const searchSocio = async () => {
    try {
      const identificador = inputValue;
      console.log(identificador);

      const response = await fetch(
        "https://zentra-pilates-production.up.railway.app/buscarSocio/",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            identificador: identificador,
          }),
        }
      );

      const responseJson = await response.json();
      setData(responseJson.data);
      console.log(responseJson);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section>
      <div>
        <div className={styles.container_title}>
          <div className={styles.title}>
            <h1>Buscador de Socios</h1>
          </div>
        </div>
        <div className={styles.container_info}>
          <div className={styles.container_input}>
            <input
              type="text"
              placeholder="Buscar socio por nombre o ID"
              value={inputValue}
              onChange={handleInputChange}
              className={styles.input}
            />
            <button onClick={handleSearch} className={styles.button}>
              Buscar
            </button>
          </div>

          {isLoading ? (
            <Loader />
          ) : data && data.length >= 1 ? (
            <div className={styles.container_results}>
              <h3 className={styles.subtitle}>Resultados:</h3>
              {data.map((socio, index) => (
                <div key={index} className={styles.results}>
                  <p>{socio.nombre}</p>
                  <Link href={`/editar/${socio.ci}`} className={styles.button}>
                    Editar
                  </Link>
                </div>
              ))}
            </div>
          ) : data && data.length <= 0 ? (
            <p>No hay coincidencias</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
