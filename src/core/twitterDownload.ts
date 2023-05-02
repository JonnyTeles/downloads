const { TwitterScraper } = require("@tcortega/twitter-scraper");

export async function twitterDownloader(url: string) {
    const twtScraper = await TwitterScraper.create();
    const tweetMeta = await twtScraper.getTweetMeta(url).catch(async (err: any) => {
        if (err.errorType === 'INVALID_URL') {
            return 'Url inválida'
        } else {
            return ('Erro:\n' + err)
        }
    });
    return tweetMeta
}