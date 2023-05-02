import Button from "./Button";
import { iDownloadCard } from "@/interfaces/downloadCard.interface";

export default function DownloadCard(props: iDownloadCard) {

  return (
    <div
      className={`
        flex justify-center 
        bg-gradient-to-r from-blue-500 to-blue-800
        w-full
        text-white
      `}
    >
      <div className="w-full max-w-md">
        <div className="p-6 ">
          <div className="font-bold text-xl mb-2">{props.title}</div>
          <img className="w-full" src={props.thumb} alt="image" />
          <p className=" text-base my-4">
            Canal: {props.channel} <br />
            Views: {props.views}
          </p>
          <div className="flex justify-between">
            <a href={props.link}>
              <Button color="green">Baixar</Button>
            </a>
            <Button color="red" onClick={props.back}>
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
