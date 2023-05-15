import Link from "next/link";
import Image from "next/image";
import phone from "../src/assets/icons/phone.svg";
import instagram from "../src/assets/icons/instagram.svg";
import facebook from "../src/assets/icons/facebook.svg";
import mail from "../src/assets/icons/mail.svg";
import whatsapp from "../src/assets/icons/whatsapp.svg"
import logo from "../src/assets/Logo.png";
import arrow from "../src/assets/menu/arrow.svg";
import Head from "next/head";
import styles from "@/styles/Layout.module.css";

export default function Layout({ children, title, content }) {
  return (
    <div>
      <Head>
        <title> {title ? `${title} ` : "Zentra Pilates "}</title>
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
              <Image
                src={mail}
                alt="Ícono mail"
                width={20}
                height={20}
                className={styles.block__img}
              />
              <p>pilateszentra@gmail.com</p>
            </div>
            <div className={styles.info__icon2}>
              <Image
                src={facebook}
                alt="Ícono facebook"
                width={20}
                height={20}
                className={styles.block__img}
              />
              <Image
                src={instagram}
                alt="Ícono instagram"
                width={20}
                height={20}
                className={styles.block__img}
              />
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.block__menu}>
            <div className={styles.menu__logo}>
              <Image
                src={logo}
                alt="Logo Zentra Pilates"
                fill
                sizes="(max-width: 175px) 100vw"
              />
            </div>
            <nav className={styles.menu__nav}>
              <ul className={styles.menu__list}>
                <li>
                  <Link href="/">INICIO</Link>
                </li>
                <li>
                  <Link href="">NOSOTRAS</Link>
                </li>
                <li>
                  <Link href="">ESTUDIO</Link>
                </li>
                <li className={styles.dropdown}>
                  <Link href="" className={styles.link__arrow}>
                    ACTIVIDADES
                    <Image
                      src={arrow}
                      alt="flecha menú"
                      width={20}
                      height={20}
                      className={styles.arrow}
                    />
                  </Link>
                  <ul className={styles.dropdownItems}>
                    <li>
                      <Link href="">Grupales</Link>
                    </li>
                    <li>
                      <Link href="">Zentra One</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="">HORARIOS</Link>
                </li>
                <li>
                  <Link href="">PLANES</Link>
                </li>
                <li>
                  <Link href="">PAGOS</Link>
                </li>
                <li>
                  <Link href="">CONTACTA</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className={styles.contact__icon}>
          <Image src={whatsapp} width={52} height={52} alt="ícono whatsapp" className={styles.icon__whatsapp}/>
          <p>Contactá!</p>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
