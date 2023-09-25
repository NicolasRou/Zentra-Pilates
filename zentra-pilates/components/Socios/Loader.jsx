import Logo from "../../src/assets/miniLogo.png";
import Image from "next/image";
import styles from "@/styles/Socios/Loader.module.css";

export default function Loader() {
  return (
    <div>
      <div className={styles.container_logo}>
        <Image src={Logo} width={50} className={styles.logo} alt="Logo" />
        <h2>Cargando...</h2>
      </div>
    </div>
  );
}

// useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return <Loader />;
//   }