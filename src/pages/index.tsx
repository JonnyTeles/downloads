import Download from "@/hooks/download";
import Input from "./components/Input";
import Button from "./components/Button";
import DownloadCard from "./components/DownloadCard";
import Layout from "./templates/Layout";
import HandleKeyPress from "@/hooks/handleKeyPress";
import SetIconType from "@/hooks/setIconType";
import Image from "next/image";
import Icon from "./components/Icons";

export default function Home() {
  const { getUrl, getRes, _setUrl, handleUrl, visibleForm, showForm } =
    Download();

  const { _setIcon, getIcon, resetIcon } = SetIconType();

  const { handleKeyPress } = HandleKeyPress({ handleUrl });

  const icon = getIcon();
  let path = "";
  if (icon.type == "twitch") path = "icons/twitch.svg";
  if (icon.type == "twitter") path = "icons/twitter.svg";
  if (icon.type == "youtube") path = "icons/youtube.svg";

  return (
    <div
      className={`
      flex justify-center items-center min-h-screen
      bg-gradient-to-r from-blue-500 to-blue-800
      text-white h-auto
       `}
    >
      <Layout title="Download YouTube, Twitter, Twitch">
        {visibleForm ? (
          <>
            <div className="flex justify-start p-1">
              <div className="flex-1">
                <div className="flex flex-wrap h-20 justify-start items-center p-2 -mt-8 flex-grow">
                  {icon.type === "youtube" && <img src={path} alt="icon" />}
                  {icon.type === "twitch" && <img src={path} alt="icon" />}
                  {icon.type === "twitter" && <img src={path} alt="icon" />}
                  <p className="ml-2 text-2xl font-bold text-purple-700">
                    {icon.text !== ""
                      ? icon.text
                      : "Insira o link do vídeo aqui..."}
                  </p>
                </div>
                <Input
                  changeValue={(url) => {
                    _setUrl(url), _setIcon(url);
                  }}
                  value={getUrl()}
                  placeholder="youtube, twitch ou twitter"
                  handleKeyPress={(e) => handleKeyPress(e, getUrl())}
                />
                <div className="mt-3 flex justify-start">
                  <Button
                    onClick={() => handleUrl(String(getUrl()))}
                    icon={Icon("search")}
                  >
                    {" "}
                    Pesquisar...{" "}
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <DownloadCard
            back={() => {
              showForm(), resetIcon();
            }}
            link={getRes().download}
            channel={getRes().channel}
            thumb={getRes().thumb}
            title={getRes().title}
            views={getRes().views}
            youtube={getRes().youtube}
            twitter={getRes().twitter}
            channelLink={getRes().channelLink}
            originalUrl={getRes().originalLink}
            icon={getIcon()}
          />
        )}
      </Layout>
    </div>
  );
}
