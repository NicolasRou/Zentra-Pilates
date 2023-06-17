import Layout from "../../components/Layout";
import Planes from "../../components/Planes";
import Metodos from "../../components/Metodos";

export default function Pagos () {
    return (

        <Layout  title="Pagos - Zentra Pilates"
        content="Conocé nuestros planes en Zentra. Estudio de Pilates, Yoga y stretching. En magallanes 1256, Cordón, Montevideo">
            <Planes/>
            <Metodos/>
        </Layout>
    )
}