import Button from "./Button";
import { iDownloadCard } from "@/interfaces/downloadCard.interface";
import Icon from "./Icons";
import FileSaver from "file-saver";
import { Tweet } from "react-twitter-widgets";
import YouTube from "react-youtube";
import axios from "axios";
import SnackBar from "./Snackbar";
import Download from "@/hooks/download";
import { useState, useEffect } from "react";
import DarkMode from "@/hooks/darkMode";

export default function DownloadCard(props: iDownloadCard) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [className, setClassName] = useState("m-1 hover:bg-purple-500");
  const { openSnackbar, closeSnackbar, message, type, open } = Download();
  const { darkMode } = DarkMode();
  const [background, setBackground] = useState(
    "bg-gradient-to-r from-blue-500 to-blue-800"
  );
  useEffect(() => {
    setBackground(
      darkMode
        ? "bg-gradient-to-r from-blue-900 to-blue-950"
        : "bg-gradient-to-r from-blue-500 to-blue-800"
    );
  }, [darkMode]);

  async function handleDownload(
    url: string,
    name: string,
    quality: string,
    youtube: boolean
  ) {
    setIsDownloading(true);
    setClassName("m-1 bg-gray-500");
    openSnackbar(`O downlaod começará em breve...`, "success");
    if (youtube) {
      if (quality === "mp3") {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_AWS_API}/youtube/download2?url=${url}`,
            {
              responseType: "blob",
            }
          )
          .then((response) => {
            const blob = new Blob([response.data], { type: "msuic/mp3" });
            FileSaver.saveAs(blob, `${name}.mp3`);
            setIsDownloading(false);
            setClassName("m-1 hover:bg-purple-500");
          });
      } else {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_AWS_API}/youtube/download?url=${url}`,
            {
              responseType: "blob",
            }
          )
          .then((response) => {
            const blob = new Blob([response.data], { type: "video/mp4" });
            FileSaver.saveAs(blob, `${name}.mp4`);
            setIsDownloading(false);
            setClassName("m-1 hover:bg-purple-500");
          });
      }
    } else {
      FileSaver.saveAs(url, `${name}.mp4`);
      setIsDownloading(false);
      setClassName("m-1 hover:bg-purple-500");
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
        <Button
          color="purple"
          icon={Icon("download")}
          className="flex-grow-0 hover:bg-purple-500"
        >
          Baixar
        </Button>
      </a>
    ) : (
      downloadLinks.map(([quality]) => (
        <Button
          key={quality}
          color="purple"
          icon={Icon("download")}
          className={className}
          disabled={isDownloading}
          onClick={() =>
            handleDownload(props.originalUrl, props.title, quality, true)
          }
        >
          {isDownloading ? "Baixando..." : `Baixar ${quality}`}
        </Button>
      ))
    );

  const layout =
    twitter === true ? (
      <div
        className={`
        flex justify-center 
        flex-col-reverse
        text-white
      ${background}
      `}
      >
        <SnackBar
          open={open}
          message={message}
          type={type}
          closeSnackbar={closeSnackbar}
          className="bg-gradient-to-r from-purple-600 to-purple-800 text-white bg-gradient font-bold"
        />
        <div className="justify-center flex">
          <div className="p-5">
            <Tweet tweetId={props.thumb} />
            <p className=" text-base my-4 ">
              Favoritos: {props.views}
              <br />
              Replys: {props.title}
            </p>
            <div className="align-middle justify-around flex m-1">
              {downloadButtons}
            </div>
          </div>
        </div>
        <div className="self-end pt-2 pr-2">
          <Button
            color="purple"
            icon={Icon("back")}
            onClick={props.back}
            className="hover:bg-purple-500"
          >
            Voltar
          </Button>
        </div>
      </div>
    ) : youtube === true ? (
      <div
        className={`
        flex justify-center 
        flex-col-reverse
        text-white
        ${background}
      `}
      >
        <SnackBar
          open={open}
          message={message}
          type={type}
          closeSnackbar={closeSnackbar}
          className="bg-gradient-to-r from-purple-600 to-purple-800 text-white bg-gradient font-bold"
        />
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
          <Button
            color="purple"
            icon={Icon("back")}
            onClick={props.back}
            className="hover:bg-purple-500"
          >
            Voltar
          </Button>
        </div>
      </div>
    ) : (
      <div
        className={`
        flex justify-center 
        flex-col-reverse
        text-white
        ${background}
      `}
      >
        <SnackBar
          open={open}
          message={message}
          type={type}
          closeSnackbar={closeSnackbar}
          className="bg-gradient-to-r from-purple-600 to-purple-800 text-white bg-gradient font-bold"
        />
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
          <Button
            color="purple"
            icon={Icon("back")}
            onClick={props.back}
            className="hover:bg-purple-500"
          >
            Voltar
          </Button>
        </div>
      </div>
    );

  return layout;
}
