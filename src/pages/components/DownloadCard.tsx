import download from "@/hooks/download";
import Button from "./Button";
import { iDownloadCard } from "@/interfaces/downloadCard.interface";

export default function DownloadCard(props: iDownloadCard) {
  const { visibleDownloadCard, showForm } = download();
  return (
    <div
      className={`
    flex justify-center items-center h-screen
    bg-gradient-to-r from-blue-500 to-purple-500
    text-white
     `}
    >
      <div className="flex justify-end mt-7">
        <a href={props.link}>
          Baixar
          <Button color="green">Baixar</Button>
        </a>
      <Button color="red" onClick={props.back}>
        Voltar
      </Button>
      </div>
    </div>
  );
}
