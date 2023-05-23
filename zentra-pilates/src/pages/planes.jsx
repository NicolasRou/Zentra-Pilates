import Layout from "../../components/Layout";
import Actividades from "../../components/Actividades";
import Planes from "../../components/Planes";

export default function Precios() {
  return (
    <>
      <Layout
        title="Planes - Zentra Pilates"
        content="Conocé nuestros planes en Zentra. Estudio de Pilates, Yoga y stretching. En magallanes 1256, Cordón, Montevideo"
      >
        <div>
          <Actividades />
          <Planes />
        </div>
      </Layout>
    </>
  );
}
