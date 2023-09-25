import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Socios() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchSocio = async (inputValue) => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/buscarSocio`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          identificator: inputValue,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al buscar al socio.");
      }
      const data = await response.json();
      console.log(data)
      setSearchResults(data);
   
    } catch (error) {
      console.error("Error: ", error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Buscador de Socios</h1>
      <SearchBar onSearch={searchSocio} />

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        // <ul>
        //   {searchResults.map((socio) => (
        //     <li key={socio.id}>
        //       <p>Nombre: {socio.name}</p>
        //       <p>ID Socio: {socio.id_socio}</p>
        //       {/* Agrega más información del socio según tu modelo de datos */}
        //     </li>
        //   ))}
        // </ul>
        <p></p>
      )}
    </div>
  );
}
