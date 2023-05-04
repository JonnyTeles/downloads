import { iTwitterResponse } from "@/pages/api/interface/twitterResponse";
import axios from "axios";

export default async function twitterApiRequest(url: string): Promise<iTwitterResponse> {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_TWITTER_API}?twitter=${url}`)
        return {
            id: response.data.response.id,
            download: response.data.response.download,
            favorite_count: response.data.response.favorite_count,
            reply_count: response.data.response.reply_count
        }
    } catch (err) {
        console.error(err);
        throw new Error(`${err}`);
    }
}