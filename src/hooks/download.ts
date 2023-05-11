import { useState } from "react";
import ShowVisible from "./showVisible";
import { twitchDownload } from "@/core/twitchDownload";
import { iTwitchDownload } from "@/interfaces/twitchDownloadr.interface";
import youtubeApiRequest from "@/core/youtubeApiRequest";
import twitterApiRequest from "@/core/twitterApiRequest";
import HandleSnackbar from "./handleSnackbar";

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
    const { openSnackbar, closeSnackbar, message, open, type } = HandleSnackbar();

    async function handleUrl(url: string) {
        if (url.length === 0) {
            openSnackbar(`Campo URL não pode estar vázio`, 'error')
            return
        } else {
            if (url.includes('twitch')) {
                showSpinner()
                try {
                    await twitchDl(url).then(() => {
                        showDownloadCard()
                        _setUrl('')
                        closeSnackbar()
                    })
                } catch (err: any) {
                    showForm()
                    openSnackbar(`Erro ao realizar o download`, 'error')
                }
            } else if (url.includes('youtube') || url.includes('youtu.be')) {
                showSpinner()
                try {
                    await youtubeDl(url).then(() => {
                        showDownloadCard()
                        _setUrl('')
                        closeSnackbar()
                    })
                } catch (err: any) {
                    console.error(err);
                    if (err instanceof Error && err.message === 'O vídeo não pode ser maior que 35 minutos') {
                        showForm()
                        openSnackbar(`O vídeo não pode ser maior que 35 minutos`, 'error')
                    } else {
                        showForm()
                        openSnackbar(`Erro ao realizar o download`, 'error')
                    }
                }
            } else if (url.includes('twitter')) {
                showSpinner()
                try {
                    await twitterDl(url).then(() => {
                        showDownloadCard()
                        _setUrl('')
                        closeSnackbar()
                    })
                } catch (err: any) {
                    showForm()
                    openSnackbar(`Erro ao realizar o download`, 'error')
                }
            }
            else {
                openSnackbar(`URL INVÁLIDA`, 'error')
            }
        }
    }

    async function twitchDl(url: string) {
        const res: iTwitchDownload = await twitchDownload(url)
        const newDownloadInfo = {
            channel: res.channel,
            download: res.download,
            thumb: res.thumb,
            title: res.title,
            views: res.views,
            youtube: false,
            twitter: false,
            channelLink: `https://www.twitch.tv/${res.channel}`,
            originalLink: url,
        }
        const history = JSON.parse(localStorage.getItem('historico') || '[]')
        const hasVideoInHistory = history.some((video: any) => video.originalLink === newDownloadInfo.originalLink)

        if (!hasVideoInHistory) {
            const newHistory = [...history, newDownloadInfo]
            localStorage.setItem('historico', JSON.stringify(newHistory))
        }

        setDownloadInfo(newDownloadInfo)
    }

    async function youtubeDl(url: string) {
        const { title, downloadUrl, ownerChannelName, videoId, viewCount, channelUrl } = await youtubeApiRequest(url)
        const downloadLinks: any = {};
        for (const format of downloadUrl) {
            downloadLinks[format.quality] = format.url;
        }
        const newDownloadInfo = {
            channel: ownerChannelName,
            download: downloadLinks,
            thumb: videoId,
            title: title,
            views: +viewCount,
            youtube: true,
            twitter: false,
            channelLink: channelUrl,
            originalLink: url,
        }
        const history = JSON.parse(localStorage.getItem('historico') || '[]')
        const hasVideoInHistory = history.some((video: any) => video.originalLink === newDownloadInfo.originalLink)

        if (!hasVideoInHistory) {
            const newHistory = [...history, newDownloadInfo]
            localStorage.setItem('historico', JSON.stringify(newHistory))
        }

        setDownloadInfo(newDownloadInfo)
    }

    async function twitterDl(url: string) {
        const res = await twitterApiRequest(url)
        const { download, favorite_count, reply_count, id } = res
        const newDownloadInfo = {
            channel: 'Twitter Video',
            download: download,
            thumb: id,
            title: String(reply_count),
            views: favorite_count,
            youtube: false,
            twitter: true,
            channelLink: '',
            originalLink: url,
        }

        const history = JSON.parse(localStorage.getItem('historico') || '[]')
        const hasVideoInHistory = history.some((video: any) => video.originalLink === newDownloadInfo.originalLink)

        if (!hasVideoInHistory) {
            const newHistory = [...history, newDownloadInfo]
            localStorage.setItem('historico', JSON.stringify(newHistory))
        }

        setDownloadInfo(newDownloadInfo)
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
        visibleSpinner,
        openSnackbar,
        closeSnackbar,
        message,
        open,
        type
    }
}