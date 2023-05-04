import type { NextApiRequest } from 'next'
import { youtubeDownloader } from '../../utils/youtubeDownload'
import { HttpStatusCode } from 'axios'
import { ApiError } from 'next/dist/server/api-utils'

export default async function youtubeDownloadApi(req: NextApiRequest,
    res: any) {
    const url = req.query.yurl

    if (!url) {
        throw new ApiError(HttpStatusCode.BadRequest,
            'URL vázia')
    }

    try {
        const response = await youtubeDownloader(String(url))
        return res.status(200).send({ response })
    } catch (err) {
        console.log(err);
        throw new ApiError(HttpStatusCode.InternalServerError, `Erro: ${err}`)
    }
}