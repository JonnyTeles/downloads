import { iTwitterResponse } from "../interface/twitterResponse";

const { TwitterScraper } = require("@tcortega/twitter-scraper");

export async function twitterDownloader(url: string): Promise<iTwitterResponse> {
    const twtScraper = await TwitterScraper.create();
    try {
        const tweetMeta = await twtScraper.getTweetMeta(url)
        return {
            download: tweetMeta.media_url[0].url,
            favorite_count: tweetMeta.favorite_count,
            reply_count: tweetMeta.reply_count
        }
    } catch (err) {
        console.log(err);
        throw new Error(`${err}`)
    }
}