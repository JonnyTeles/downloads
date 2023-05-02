const twitterGetUrl = require("twitter-url-direct")

export async function twitterDownloader(url: string) {
    console.log('URL AQUI ' + url);
    const response = await twitterGetUrl(url).catch(async (err: any) => {
        if (err.errorType === 'INVALID_URL') {
            return 'Url inválida'
        } else {
            return ('Erro:\n' + err)
        }
    });
    return response
}