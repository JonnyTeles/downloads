import { useState } from "react";
import ShowVisible from "./showVisible";
import { twitchDownload } from "@/core/twitchDownload";
import { iTwitchDownload } from "@/interfaces/twitchDownloadr.interface";
import youtubeApiRequest from "@/core/youtubeApiRequest";
import twitterApiRequest from "@/core/twitterApiRequest";

export default function Download() {

    const [url, setUrl] = useState("");
    const [downloadInfo, setDownloadInfo] = useState({
        download: "",
        title: "",
        thumb: "",
        views: 0,
        channel: "",
        youtube: false,
        twitter: false,
        channelLink: "",
        originalLink: "",
    });

    const { showDownloadCard, showForm, showSpinner, visibleDownloadCard, visibleForm, visibleSpinner } = ShowVisible()

    async function handleUrl(url: string) {
        if (url.length === 0) {
            alert('Campo url não pode ser vázio')
            return
        } else {
            if (url.includes('twitch')) {
                showSpinner()
                try {
                    await twitchDl(url).then(() => {
                        showDownloadCard()
                        _setUrl('')
                    })
                } catch (err: any) {
                    showForm()
                    alert(`Erro ao realizar o download: ${err.message}`);
                }
            } else if (url.includes('youtube') || url.includes('youtu.be')) {
                showSpinner()
                try {
                    await youtubeDl(url).then(() => {
                        showDownloadCard()
                        _setUrl('')
                    })
                } catch (err: any) {
                    showForm()
                    alert(`Erro ao realizar o download: ${err.message}`);
                }
            } else if (url.includes('twitter')) {
                showSpinner()
                try {
                    await twitterDl(url).then(() => {
                        showDownloadCard()
                        _setUrl('')
                    })
                } catch (err: any) {
                    showForm()
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
            twitter: false,
            channelLink: `https://www.twitch.tv/${res.channel}`,
            originalLink: url,
        })
        // localStorage.setItem('historico', JSON.stringify(getRes()))
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
            twitter: false,
            channelLink: channelUrl,
            originalLink: url,
        })
    }

    async function twitterDl(url: string) {
        const res = await twitterApiRequest(url)
        const { download, favorite_count, reply_count, id } = res
        setDownloadInfo({
            channel: String(reply_count),
            download: download,
            thumb: id,
            title: 'Twitter Video',
            views: favorite_count,
            youtube: false,
            twitter: true,
            channelLink: '',
            originalLink: url,
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
        showSpinner,
        getRes,
        visibleDownloadCard,
        visibleForm,
        visibleSpinner
    }
}