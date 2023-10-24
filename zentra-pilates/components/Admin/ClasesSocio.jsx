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

      const response = await fetch("http://localhost:5000/claseSocio", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          id: ci,
        }),
      });
      const responseJson = await response.json();
      setDataClase(responseJson.data);
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
      <ul>
        {dataClase.map((clase, index) => (
          <li key={index}>
            <p>{clase}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
