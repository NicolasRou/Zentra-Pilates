import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../Socios/Loader";

export default function ClasesSocio() {
  const [dataClase, setDataClase] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  const claseSocio = async () => {
    try {
      const ci = id;
      const response = await fetch(
        "https://zentra-pilates-production.up.railway.app/claseSocio",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            id: ci,
          }),
        }
      );
      const responseJson = await response.json();
      setDataClase(responseJson.data);
      console.log(responseJson);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    claseSocio();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  console.log(dataClase);

  return (
    <section>
      {dataClase && dataClase.length > 0 ? (
        <ul>
          {dataClase.map((clase, index) => (
            <li key={index}>
              <p>{clase}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tiene clases agendadas</p>
      )}
    </section>
  );
}
