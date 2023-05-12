import Download from "@/hooks/download";
import Input from "./components/Input";
import Button from "./components/Button";
import DownloadCard from "./components/DownloadCard";
import Layout from "./templates/Layout";
import HandleKeyPress from "@/hooks/handleKeyPress";
import SetIconType from "@/hooks/setIconType";
import Icon from "./components/Icons";
import Spinner from "./components/Spinner";
import SnackBar from "./components/Snackbar";

export default function Home() {
  const {
    getUrl,
    getRes,
    _setUrl,
    handleUrl,
    showForm,
    visibleForm,
    visibleSpinner,
    closeSnackbar,
    message,
    type,
    open,
  } = Download();

  const { _setIcon, getIcon, resetIcon } = SetIconType();
  const { handleKeyPress } = HandleKeyPress({ handleUrl });
  const icon = getIcon();

  return (
      <Layout title="Download YouTube, Twitter, Twitch">
        {visibleSpinner ? (
          <Spinner color="purple" text="Buscando..." />
        ) : visibleForm ? (
          <>
            <div className="flex justify-start p-1">
              <div className="flex-1">
                <div className="flex flex-wrap h-20 justify-start items-center p-2 -mt-8 flex-grow">
                  {icon.type === "youtube" && (
                    <img src={icon.icon} alt="icon" />
                  )}
                  {icon.type === "twitch" && <img src={icon.icon} alt="icon" />}
                  {icon.type === "twitter" && (
                    <img src={icon.icon} alt="icon" />
                  )}
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
                    color="purple"
                    className="hover:bg-purple-500"
                  >
                    {" "}
                    Pesquisar...{" "}
                  </Button>
                  <SnackBar
                    open={open}
                    message={message}
                    type={type}
                    closeSnackbar={closeSnackbar}
                    className="bg-gradient-to-r from-purple-600 to-purple-800 text-white bg-gradient font-bold"
                  />
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
  );
}
