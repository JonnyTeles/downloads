import Download from "@/hooks/download";
import Input from "./components/Input";
import Button from "./components/Button";
import DownloadCard from "./components/DownloadCard";
import Layout from "./templates/Layout";

export default function Home() {
  const { getUrl, _setUrl, handleUrl, visibleForm, showForm } = Download();

  return (
    <div
      className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
       `}
    >
      <Layout title="Download videos YouTube, Twitter, Twitch Clips">
        {visibleForm ? (
          <>
            <div className="flex justify-end">
              <Input
                texto="Download"
                changeValue={(url) => _setUrl(url)}
                value={getUrl()}
              />
              <Button onClick={() => handleUrl(getUrl())}>
                {" "}
                Pesquisar...{" "}
              </Button>
            </div>
          </>
        ) : (
          <DownloadCard back={showForm} link="google.com"/>
        )}
      </Layout>
    </div>
  );
}
