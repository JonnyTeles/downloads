import { iYoutubeResponse } from "@/pages/api/interface/youtubeResponse";
import axios from "axios";

export default async function youtubeApiRequest(url: string): Promise<iYoutubeResponse> {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_YOUTUBE_API}?yurl=${url}`)
        const { downloadUrl, ownerChannelName, title, viewCount, thumbnails, channelUrl } = response.data.response
        return {
            downloadUrl: downloadUrl,
            ownerChannelName: ownerChannelName,
            title: title,
            thumbnails: thumbnails,
            viewCount: viewCount,
            channelUrl: channelUrl
        }
    } catch (err) {
        console.error(err);
        throw new Error(`${err}`);
    }
}