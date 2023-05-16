import Link from "next/link";
import Image from "next/image";
import clases1 from "../src/assets/img/clases1.png"
import clases2 from "../src/assets/img/clases2.png"
import clases3 from "../src/assets/img/clases3.png"


export default function Clases() {
  return (
    <div>
      <div>
        <h3>Clases por zoom</h3>
        <p>
          Entrenamientos de pilates, pilates funcional, pilates para embarazadas
          y stretching online grupal por Zoom. Conocé nuestra promo y reservá tu
          lugar ahora!
        </p>
        <div>
          <Image src={clases1}/>
          <Link href="">INSCRIBIRME</Link>
        </div>
      </div>
      <div>
        <h3>Clases por zoom</h3>
        <p>
          Entrenamientos de pilates, pilates funcional, pilates para embarazadas
          y stretching online grupal por Zoom. Conocé nuestra promo y reservá tu
          lugar ahora!
        </p>
        <div>
          <Image src={clases2}/>
          <Link href="">RESERVAR CLASE</Link>
        </div>
      </div>
      <div>
        <h3>Clases por zoom</h3>
        <p>
          Entrenamientos de pilates, pilates funcional, pilates para embarazadas
          y stretching online grupal por Zoom. Conocé nuestra promo y reservá tu
          lugar ahora!
        </p>
        <div>
          <Image src={clases3}/>
          <Link href="">LISTA DE ESPERA</Link>
        </div>
      </div>
    </div>
  );
}
