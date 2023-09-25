import { useState } from "react";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSearch = () => {
    searchSocio();
  };

  const searchSocio = async () => {
    try {
      const identificador = inputValue;
      console.log(identificador);

      const response = await fetch("http://localhost:5000/buscarSocio/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          identificador: identificador,
        }),
      });

      const responseJson = await response.json();
      setData(responseJson);
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Buscar socio por nombre o ID"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {data && data.data.length >= 1 ? (
        <div>
          <h2>Hay data</h2>
          <span>{data.data[0].nombre}</span>
        </div>
      ) : null}
    </div>
  );
}
