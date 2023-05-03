import type { NextApiRequest } from 'next'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'
import { twitterDownloader } from '../../utils/twitterDownload'

export default async function twitterDownloaderApi(req: NextApiRequest,
    res: any) {
    const url = req.query.twitter

    if (!url) {
        throw new ApiError(HttpStatusCode.BadRequest,
            'URL vázia')
    }
    try {
        const response = await twitterDownloader(String(url))
        return res.status(200).send({ response })
    } catch (err) {
        console.log(err);
        throw new ApiError(HttpStatusCode.InternalServerError, `Erro: ${err}`)
    }


}