import Button from "./Button";
import { iDownloadCard } from "@/interfaces/downloadCard.interface";
import Icon from "./Icons";

export default function DownloadCard(props: iDownloadCard) {
  const { link, youtube } = props;
  const downloadLinks = Object.entries(link);
  const downloadButtons =
    youtube === false ? (
      <a key={props.link} download href={props.link} target="_blank">
        <Button color="green" icon={Icon("download")} className="flex-grow-0">
          Baixar
        </Button>
      </a>
    ) : (
      downloadLinks.map(([quality, url]) => (
        <a key={quality} download href={url} target="_blank">
          <Button color="green" icon={Icon("download")} className="m-1">
            Baixar {quality}
          </Button>
        </a>
      ))
    );

  return (
    <div
      className={`
        flex justify-center 
        bg-gradient-to-r from-blue-500 to-blue-700
        w-full
        text-white
      `}
    >
      <div className="w-full max-w-md">
        <div className="p-6 ">
          <a href={props.originalUrl} target="_blank" className="inline-block">
            <div className="font-bold text-xl mb-2 hover:text-purple-800">
              {props.title}
            </div>
          </a>
          <img
            className="w-full"
            src={props.thumb}
            alt="image"
            width={500}
            height={500}
          />
          <p className=" text-base my-4 ">
            <a href={props.channelLink} target="_blank" className="hover:text-purple-800">
              Canal: {props.channel}
            </a>
            <br />
            Views: {props.views}
          </p>
          <div className="align-middle justify-around flex m-1">
            {downloadButtons}
            <div className="m-1">
              <Button color="red" icon={Icon("back")} onClick={props.back}>
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
