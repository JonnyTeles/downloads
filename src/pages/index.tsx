import Download from "@/hooks/download";
import Input from "./components/Input";
import Button from "./components/Button";
import DownloadCard from "./components/DownloadCard";
import Layout from "./templates/Layout";
import HandleKeyPress from "@/hooks/handleKeyPress";
import Icon from "./components/Icons";

export default function Home() {
  const { getUrl, getRes, _setUrl, handleUrl, visibleForm, showForm } =
    Download();

    const { handleKeyPress } = HandleKeyPress({ handleUrl });

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
                <Input
                  texto="Download"
                  changeValue={(url) => _setUrl(url)}
                  value={getUrl()}
                  placeholder="Url..."
                  handleKeyPress={(e) => handleKeyPress(e, getUrl())}
                />
                <div className="mt-3 flex justify-start">
                  <Button onClick={() => handleUrl(String(getUrl()))} 
                  icon={Icon('search')}
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
            back={showForm}
            link={getRes().download}
            channel={getRes().channel}
            thumb={getRes().thumb}
            title={getRes().title}
            views={getRes().views}
            youtube={getRes().youtube}
            channelLink={getRes().channelLink}
            originalUrl={getRes().originalLink}
          />
        )}
      </Layout>
    </div>
  );
}
