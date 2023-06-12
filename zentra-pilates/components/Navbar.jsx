import styles from "@/styles/Navbar.module.css";
import arrow from "../src/assets/menu/arrow.svg";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ open }) {
  return (
    <>
      <nav open={open} className={open ? "menu__navShow" : "menu__navHide"}>
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
      <style jsx>{`
        .menu__navShow {
          background: #ffff;
          position: absolute;
          margin-top: 80px;
          width: 60%;
          height: 50vh;
          opacity: 1;
          animation: fade-in 1s ;
        }
        .menu__navHide {
          display: none;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          heigth: 0;
          opacity: 1;
          animation: fade-out 0.2s ;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @media only screen and (min-width: 624px) {
          .menu__navHide {
            flex-direction: row;
            position: initial;
            height: auto;
            justify-content: center;
            display: block;
          }
        }
      `}</style>
    </>
  );
}
