import Button from "./Button";
import { iDownloadCard } from "@/interfaces/downloadCard.interface";
import Icon from "./Icons";
import FileSaver from "file-saver";
import { Tweet } from "react-twitter-widgets";
import YouTube from "react-youtube";
import axios from "axios";
import SnackBar from "./Snackbar";
import Download from "@/hooks/download";

export default function DownloadCard(props: iDownloadCard) {

  const {
    openSnackbar,
    closeSnackbar, 
    message, 
    type, 
    open
  } = Download();

  async function handleDownload(url: string, name: string, quality: string, youtube: boolean) {
    openSnackbar(`O downlaod começará em breve...`, 'success')
    if(youtube){
      if (quality === "mp3") {
        axios
          .get(`${process.env.NEXT_PUBLIC_AWS_API}/youtube/download2?url=${url}`, {
            responseType: "blob",
          })
          .then((response) => {
            const blob = new Blob([response.data], { type: "msuic/mp3" });
            FileSaver.saveAs(blob, `${name}.mp3`);
          });
      } else {
        axios
          .get(`${process.env.NEXT_PUBLIC_AWS_API}/youtube/download?url=${url}`, {
            responseType: "blob",
          })
          .then((response) => {
            const blob = new Blob([response.data], { type: "video/mp4" });
            FileSaver.saveAs(blob, `${name}.mp4`);
          });
      }
    } else {
      FileSaver.saveAs(url, `${name}.mp4`);
    }
  }

  const { link, youtube, twitter } = props;
  const downloadLinks = Object.entries(link || {});
  const downloadButtons =
    youtube === false ? (
      <a
        key={props.link}
        download
        onClick={() => handleDownload(props.link, props.title, "mp4", false)}
      >
        <Button color="purple" icon={Icon("download")} className="flex-grow-0">
          Baixar
        </Button>
      </a>
    ) : (
      downloadLinks.map(([quality]) => (
        <a
          key={quality}
          download
          onClick={() =>
            handleDownload(props.originalUrl, props.title, quality, true)
          }
        >
          <Button color="purple" icon={Icon("download")} className="m-1">
            Baixar {quality}
          </Button>
        </a>
      ))
    );

  const layout =
    twitter === true ? (
      <div
        className={`
        flex justify-center 
        bg-gradient-to-r from-blue-500 to-blue-700
        flex-col-reverse
        text-white
      `}
      >
         <SnackBar open={open} message={message} type={type} closeSnackbar={closeSnackbar} className="bg-gradient-to-r from-purple-600 to-purple-800 text-white bg-gradient font-bold" />
        <div className="w-full justify-center flex">
          <div className="p-6 justify-center h-full">
            <Tweet tweetId={props.thumb} />
            <p className=" text-base my-4 ">
              Favoritos: {props.views}
              <br />
              Replys: {props.channel}
            </p>
            <div className="align-middle justify-around flex m-1">
              {downloadButtons}
            </div>
          </div>
        </div>
        <div className="self-end pt-2 pr-2">
          <Button color="purple" icon={Icon("back")} onClick={props.back}>
            Voltar
          </Button>
        </div>
      </div>
    ) : youtube === true ? (
      <div
        className={`
        flex justify-center 
        bg-gradient-to-r from-blue-500 to-blue-700
        flex-col-reverse
        text-white
      `}
      >
         <SnackBar open={open} message={message} type={type} closeSnackbar={closeSnackbar} className="bg-gradient-to-r from-purple-600 to-purple-800 text-white bg-gradient font-bold" />
        <div className="justify-center items-center flex">
          <div className="p-6 justify-center">
            <a
              href={props.originalUrl}
              target="_blank"
              className="inline-block"
            >
              <div className="font-bold text-xl mb-2 hover:text-purple-800">
                {props.title}
              </div>
            </a>
            <div className="flex justify-center items-center">
              <YouTube videoId={props.thumb} />
            </div>
            <p className=" text-base my-4 ">
              <a
                href={props.channelLink}
                target="_blank"
                className="hover:text-purple-800"
              >
                Canal: {props.channel}
              </a>
              <br />
              Views: {props.views}
            </p>
            <div className="align-middle justify-around flex m-1">
              {downloadButtons}
            </div>
          </div>
        </div>
        <div className="self-end pt-2 pr-2">
          <Button color="purple" icon={Icon("back")} onClick={props.back}>
            Voltar
          </Button>
        </div>
      </div>
    ) : (
      <div
        className={`
        flex justify-center 
        bg-gradient-to-r from-blue-500 to-blue-700
        flex-col-reverse
        text-white
      `}
      >
         <SnackBar open={open} message={message} type={type} closeSnackbar={closeSnackbar} className="bg-gradient-to-r from-purple-600 to-purple-800 text-white bg-gradient font-bold" />
        <div className="w-full justify-center flex">
          <div className="p-6 justify-center">
            <a
              href={props.originalUrl}
              target="_blank"
              className="flex justify-center"
            >
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
              <a
                href={props.channelLink}
                target="_blank"
                className="hover:text-purple-800"
              >
                Canal: {props.channel}
              </a>
              <br />
              Views: {props.views}
            </p>
            <div className="align-middle justify-around flex m-1">
              {downloadButtons}
            </div>
          </div>
        </div>
        <div className="self-end pt-2 pr-2">
          <Button color="purple" icon={Icon("back")} onClick={props.back}>
            Voltar
          </Button>
        </div>
      </div>
    );

  return layout;
}
