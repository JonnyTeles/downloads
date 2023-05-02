import { useState } from "react";
import ShowVisible from "./showVisible";
import { twitterDownloader } from "@/core/twitterDownload";

export default function Download() {
    
    const [url, setUrl] = useState("");

    const { showDownloadCard, showForm, visibleDownloadCard, visibleForm } = ShowVisible()


    async function handleUrl(url: string) {
        if(url.includes('twitter')){
            console.log(await twitterDownloader(url).catch(err => console.error(err)))
            showDownloadCard()
        }
        return console.log(url);
    }

    function _setUrl(url: string){
        setUrl(url)
        return console.log(url);
    }

    function getUrl(){
        return url
    }



    return {
        getUrl,
        _setUrl,
        handleUrl,
        showForm,
        visibleDownloadCard,
        visibleForm,
    }
}