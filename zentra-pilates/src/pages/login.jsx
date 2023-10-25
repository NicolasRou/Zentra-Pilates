require("dotenv").config();
import styles from "@/styles/Socios/Login.module.css";
import logo from "../assets/miniLogo.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import swal from "sweetalert";

export default function Login() {
  const router = useRouter();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const setJwt = async () => {
    try {
      const response = await fetch("zentra-pilates-production.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          mail: mail,
          password: password,
        }),
      });

      if (!response.ok) {
        swal({
          title: "Error",
          text: "Datos incorrectos",
          icon: "error",
          button: "Ok",
        });
        return;
      } else {
        swal("Has ingresado con exito!", {
          buttons: false,
          timer: 1000,
        });
      }

      const responseJson = await response.json();
      console.log(responseJson);
      console.log(responseJson.data[0].ci);
      localStorage.setItem("jwt", responseJson.token);
      const clientId = responseJson.data[0].ci;

      if (clientId === "41688136") {
        router.push("/admin");
      } else {
        router.push(`/dashboard?id=${clientId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    if (!mail.trim() || !password.trim()) {
      console.log("Ingrese ambos el mail y la contraseña.");
      swal("Ingrese ambos el mail y la contraseña.", {
        buttons: false,
        timer: 1500,
        closeOnClickOutside: true,
      });
    } else if (!mail.trim()) {
      console.log("Ingrese el mail.");
    } else if (!password.trim()) {
      console.log("Ingrese la contraseña.");
    } else {
      setJwt();
    }
  };

  const onChangeMail = (e) => {
    setMail(e.target.value);
  };
  const onChangePass = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.bg__img}></div>
        <div className={styles.block_title}>
          <h1>¡Ingresá para gestionar tus clases!</h1>

          <div className={styles.block_form}>
            <Image
              src={logo}
              width={100}
              className={styles.logo}
              alt="Logo"
              priority
            />
            <form action="" className={styles.form}>
              <input
                type="email"
                value={mail}
                name="email"
                id="email"
                placeholder="Dirección de correo electrónico"
                required
                onChange={onChangeMail}
              />
              <input
                type="password"
                value={password}
                name="password"
                id="password"
                placeholder="Contraseña"
                required
                onChange={onChangePass}
              />
              <button onClick={onClick}>Ingresar</button>
            </form>
            <div className={styles.link_home}>
              <Link href="/">
                <h3>Volver al inicio</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
