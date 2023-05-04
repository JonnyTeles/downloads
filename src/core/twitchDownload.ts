import { iTwitchDownload } from "@/interfaces/twitchDownloadr.interface";
import { formatClipUrl, getClipId } from "@/utils/formatClipUrl";
import { getTwitchToken } from "@/utils/getTwitchToken";
import axios from "axios";

export async function twitchDownload(url: string): Promise<iTwitchDownload> {
    try {
        const oauth = await getTwitchToken();
        const clipId = await getClipId(url);
        const downloadUrl = await axios.get(
            `https://api.twitch.tv/helix/clips?id=${clipId}`,
            {
                headers: {
                    Authorization: `Bearer ${oauth}`,
                    "Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
                },
            }
        );
        console.log(downloadUrl.data.data[0].id);
        const download = await formatClipUrl(downloadUrl?.data.data[0].thumbnail_url);
        return {
            download: download,
            title: downloadUrl?.data.data[0].title,
            thumb: downloadUrl?.data.data[0].thumbnail_url,
            views: Number(downloadUrl?.data.data[0].view_count),
            channel: downloadUrl?.data.data[0].broadcaster_name,
        };
    } catch (err) {
        console.error(err);
        let errorMessage = `${err}`;
        if(err == "TypeError: Cannot read properties of undefined (reading 'thumbnail_url')") errorMessage = 'URL INVÁLIDA'
        throw new Error(errorMessage);
    }
}
