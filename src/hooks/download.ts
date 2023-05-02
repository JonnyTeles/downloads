import { useState } from "react";
import ShowVisible from "./showVisible";
import { twitchDownload } from "@/core/twitchDownload";
import { iTwitchDownload } from "@/interfaces/twitchDownloadr.interface";
import { youtubeDownload } from "@/core/youtubeDownload";

export default function Download() {

    const [url, setUrl] = useState("");
    const [downloadInfo, setDownloadInfo] = useState({
        download: "",
        title: "",
        thumb: "",
        views: 0,
        channel: "",
    });

    const { showDownloadCard, showForm, visibleDownloadCard, visibleForm } = ShowVisible()

    async function handleUrl(url: string) {
        if (url.length === 0) {
            alert('Campo url não pode ser vázio')
            return
        } else {
            if (url.includes('twitch')) {
                try {
                    await twitchDl(url)
                    showDownloadCard()
                    _setUrl('')
                } catch (err: any) {
                    alert(`Erro ao realizar o download: ${err.message}`);
                }
            } else if (url.includes('youtube')) {
                try {
                    alert('Só está funcionando clipes da twitch por enquanto :(')
                } catch (err: any) {
                    alert(`Erro ao realizar o download: ${err.message}`);
                }
            }
            else {
                alert(`URL INVÁLIDA`);
            }
        }
    }

    async function twitchDl(url: string) {
        const res: iTwitchDownload = await twitchDownload(url)
        setDownloadInfo({
            channel: res.channel,
            download: res.download,
            thumb: res.thumb,
            title: res.title,
            views: res.views
        })
    }

    async function youtubeDl(url: string) {
        const res: any = await youtubeDownload(url)
        return res
    }

    function _setUrl(url: string) {
        setUrl(url)
    }

    function getUrl() {
        return url
    }

    function getRes() {
        return downloadInfo
    }

    return {
        getUrl,
        _setUrl,
        handleUrl,
        showForm,
        getRes,
        visibleDownloadCard,
        visibleForm,
    }
}