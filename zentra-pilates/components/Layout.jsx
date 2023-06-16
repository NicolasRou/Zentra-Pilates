import Link from "next/link";
import Image from "next/image";
import phone from "../src/assets/icons/phone.svg";
import instagram from "../src/assets/icons/instagram.svg";
import facebook from "../src/assets/icons/facebook.svg";
import mail from "../src/assets/icons/mail.svg";
import whatsapp from "../src/assets/icons/whatsapp.svg";
import logo from "../src/assets/Logo.png";
import Head from "next/head";
import styles from "@/styles/Layout.module.css";
import Navbar from "./Navbar";
import MenuButton from "./MenuButton";
import { useState } from "react";

export default function Layout({ children, title, content }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content} />
        <meta
          property="og:title"
          content="Zentra Pilates - Estudio de Pilates"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://zentrapilates.com" />
        <meta
          property="og:description"
          content="Zentra Estudio de Pilates, Yoga y stretching. En magallanes 1256, Cordón, Montevideo"
        />
        <meta property="og:site_name" content="Zentra Pilates" />
        <link rel="icon" href="" />
        <link rel="canonical" href="http://zentrapilates.com/"></link>
      </Head>
      <header className={styles.header}>
        <div className={styles.header__top}>
          <div className={styles.block__info}>
            <div className={styles.info__icon}>
              <Image
                src={phone}
                alt="Ícono teléfono"
                width={20}
                height={20}
                className={styles.block__img}
              />
              <p>098 353 971</p>
            </div>
            <div className={styles.info__icon}>
              <Link
                href="mailto:pilateszentra@gmail.com"
                className={styles.info__icon}
              >
                <Image
                  src={mail}
                  alt="Ícono mail"
                  width={20}
                  height={20}
                  className={styles.block__img}
                />
                <p>pilateszentra@gmail.com</p>
              </Link>
            </div>
            <div className={styles.info__icon2}>
              <Link href="https://www.facebook.com/Zentra-Pilates-1731269160292932/">
                <Image
                  src={facebook}
                  alt="Ícono facebook"
                  width={20}
                  height={20}
                  className={styles.block__img}
                />
              </Link>
              <Link href="https://www.instagram.com/zentrapilates/?hl=es">
                <Image
                  src={instagram}
                  alt="Ícono instagram"
                  width={20}
                  height={20}
                  className={styles.block__img}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.block__menu}>
            <div className={styles.menu__logo}>
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logo Zentra Pilates"
                  width={150}
                  className={styles.logo}
                />
              </Link>
            </div>
            <Navbar open={open} />
            <MenuButton open={open} handleClick={handleClick} />
          </div>
        </div>
        <Link href="https://wa.me/59898353971">
          <div className={styles.contact__icon}>
            <Image
              src={whatsapp}
              width={48}
              height={48}
              alt="ícono whatsapp"
              className={styles.icon__whatsapp}
            />
            <p>Contactá!</p>
          </div>
        </Link>
      </header>
      <main>{children}</main>
      <footer>
        <div className={styles.footer}>
          <div className={styles.text}>
            <p>Diseñado por goaestudio.com</p>
            <p>Desarrollado por Nicolás Rouiller</p>
          </div>
          <div className={styles.links}>
            <Link href="https://www.facebook.com/Zentra-Pilates-1731269160292932/">
              <Image
                src={facebook}
                width={40}
                height="auto"
                alt="icono facebook"
              />
            </Link>
            <Link href="https://www.instagram.com/zentrapilates/?hl=es">
              <Image src={instagram} width={40} alt="icono instagram" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
