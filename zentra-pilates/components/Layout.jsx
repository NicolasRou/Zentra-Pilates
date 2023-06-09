import Link from "next/link";
import Image from "next/image";
import phone from "../src/assets/icons/phone.svg";
import instagram from "../src/assets/icons/instagram.svg";
import facebook from "../src/assets/icons/facebook.svg";
import mail from "../src/assets/icons/mail.svg";
import whatsapp from "../src/assets/icons/whatsapp.svg";
import logo from "../src/assets/Logo.png";
import arrow from "../src/assets/menu/arrow.svg";
import Head from "next/head";
import styles from "@/styles/Layout.module.css";

export default function Layout({ children, title, content }) {
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
                  fill
                  sizes="(max-width: 175px) 100vw"
                />
              </Link>
            </div>
            <nav className={styles.menu__nav}>
              <ul className={styles.menu__list}>
                <li>
                  <Link href="/">INICIO</Link>
                </li>
                <li>
                  <Link href="/#nosotras" scroll={false}>
                    NOSOTRAS
                  </Link>
                </li>
                <li>
                  <Link href="/#estudio" scroll={false}>
                    ESTUDIO
                  </Link>
                </li>
                <li className={styles.dropdown}>
                  <Link href="" className={styles.link__arrow} scroll={false}>
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
                      <Link href="/#actividades" scroll={false}>
                        Grupales
                      </Link>
                    </li>
                    <li>
                      <Link href="/#clases" scroll={false}>
                        Zentra One
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href={"horarios"}> HORARIOS </Link>
                </li>
                <li>
                  <Link href={"planes"}>PLANES</Link>
                </li>
                <li>
                  <Link href={"pagos"}>PAGOS</Link>
                </li>
                <li>
                  <Link href="/#contacta" scroll={false}>
                    CONTACTA
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className={styles.contact__icon}>
          <Image
            src={whatsapp}
            width={52}
            height={52}
            alt="ícono whatsapp"
            className={styles.icon__whatsapp}
          />
          <p>Contactá!</p>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className={styles.footer}>
          <div className={styles.text}>
            <p>Diseñado por goaestudio.com</p>
            <p>Desarrollado por Nicolás Rouiller</p>
          </div>
          <div className={styles.links}>
            <Link href="">
              <Image
                src={facebook}
                width={40}
                height="auto"
                alt="icono facebook"
              />
            </Link>
            <Link href="">
              <Image src={instagram} width={40} alt="icono instagram" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
