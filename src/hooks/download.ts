import { useState } from "react";
import ShowVisible from "./showVisible";
import { twitchDownload } from "@/core/twitchDownload";
import { iTwitchDownload } from "@/interfaces/twitchDownloadr.interface";
import youtubeApiRequest from "@/core/youtubeApiRequest";

export default function Download() {

    const [url, setUrl] = useState("");
    const [downloadInfo, setDownloadInfo] = useState({
        download: "",
        title: "",
        thumb: "",
        views: 0,
        channel: "",
        youtube: false,
        channelLink: "",
        originalLink: ""
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
                    await youtubeDl(url)
                    showDownloadCard()
                    _setUrl('')
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
            views: res.views,
            youtube: false,
            channelLink: `https://www.twitch.tv/${res.channel}`,
            originalLink: url
        })
    }

    async function youtubeDl(url: string) {
        const { title, downloadUrl, ownerChannelName, thumbnails, viewCount, channelUrl } = await youtubeApiRequest(url)
        const downloadLinks: any = {};
        for (const format of downloadUrl) {
            downloadLinks[format.quality] = format.url;
        }
        setDownloadInfo({
            channel: ownerChannelName,
            download: downloadLinks,
            thumb: thumbnails,
            title: title,
            views: +viewCount,
            youtube: true,
            channelLink: channelUrl,
            originalLink: url
        })
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