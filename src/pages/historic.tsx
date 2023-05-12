import { useState, useEffect } from "react";
import Layout from "./templates/Layout";
import useHistoric from "@/hooks/historic";
import { iHistoric } from "@/interfaces/historic.interface";
import ImgMediaCard from "./components/Card";
import AlertDialog from "./components/Dialog";
import Download from "@/hooks/download";
import SnackBar from "./components/Snackbar";

export default function HistoricPage() {
  const { historic, getHistoric } = useHistoric();
  const [isHistoricEmpty, setIsHistoricEmpty] = useState(false);
  const { openSnackbar, closeSnackbar, message, type, open } = Download();

  useEffect(() => {
    setIsHistoricEmpty(historic.length === 0);
  }, [historic]);

  const clearHistoric = () => {
    localStorage.clear();
    setIsHistoricEmpty(true);
  };

  function handleClick(link: string) {
    window.open(link, "_blank");
  }

  const twitterHistoric = getHistoric().filter(
    (item: iHistoric) => item.twitter
  );
  const youtubeHistoric = getHistoric().filter(
    (item: iHistoric) => !item.twitter && item.youtube
  );
  const twitchHistoric = getHistoric().filter(
    (item: iHistoric) => !item.twitter && !item.youtube
  );

  return (
      <Layout title="Histórico de pesquisas">
        <SnackBar
          open={open}
          message={message}
          type={type}
          closeSnackbar={closeSnackbar}
          className="bg-gradient-to-r from-purple-600 to-purple-800 text-white bg-gradient font-bold"
        />
        {isHistoricEmpty ? (
          <h2 className="mt-8 mb-4 text-2xl font-bold text-purple-700 text-center">
            Você não tem nada no histórico ainda...
          </h2>
        ) : (
          <>
            <div className="flex justify-end d-none">
              {historic.length > 0 && (
                <AlertDialog
                  buttonText="Limpar Histórico"
                  dialog="Deseja realmente apagar todo seu histórico de buscas?"
                  dialogTitle="Limpar Histórico"
                  dialogButton="Apagar"
                  onClose={() => {
                    clearHistoric(),
                      openSnackbar("Histórico apagado com sucesso", "success");
                  }}
                />
              )}
            </div>
            <div className="flex flex-col">
              {youtubeHistoric.length > 0 && (
                <>
                  <h2 className="mt-8 mb-4 text-2xl text-purple-700 font-bold text-center">
                    Youtube
                  </h2>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {youtubeHistoric.map((item: iHistoric, index) => (
                      <ImgMediaCard
                        key={index}
                        title={item.title}
                        description={item.channel}
                        buttonText="Visualizar Completo"
                        image={item.thumb}
                        alt={item.title}
                        height="240"
                        youtube={true}
                        twitter={false}
                        onClick={() => handleClick(item.originalLink)}
                      />
                    ))}
                  </div>
                </>
              )}

              {twitchHistoric.length > 0 && (
                <>
                  <h2 className="mt-8 mb-4 text-2xl font-bold text-purple-700 text-center">
                    Twitch
                  </h2>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {twitchHistoric.map((item: iHistoric, index) => (
                      <ImgMediaCard
                        key={index}
                        title={item.channel}
                        description={item.title}
                        buttonText="Visualizar Completo"
                        image={item.thumb}
                        alt={item.title}
                        height="240"
                        twitter={false}
                        youtube={false}
                        onClick={() => handleClick(item.originalLink)}
                      />
                    ))}
                  </div>
                </>
              )}

              {twitterHistoric.length > 0 && (
                <>
                  <h2 className="mt-8 mb-4 text-2xl font-bold text-purple-700 text-center">
                    Twitter
                  </h2>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {twitterHistoric.map((item: iHistoric, index) => (
                      <ImgMediaCard
                        key={index}
                        title={item.channel}
                        buttonText="Visualizar Completo"
                        image={item.thumb}
                        alt={item.title}
                        height="240"
                        twitter={true}
                        youtube={false}
                        onClick={() => handleClick(item.originalLink)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </Layout>
  );
}
