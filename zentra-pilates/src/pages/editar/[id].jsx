import { DataSocioProvider } from "@/contexts/dataSocio";
import EditSocio from "../../../components/Admin/EditSocio";
import { useRouter } from "next/router";
import EditAgenda from "../../../components/Admin/EditAgenda";

export default function Editar() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <DataSocioProvider id={id}>
        <EditSocio />
        <EditAgenda />
      </DataSocioProvider>
    </>
  );
}
