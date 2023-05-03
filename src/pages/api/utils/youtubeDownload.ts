import ytdl from 'ytdl-core';
import { iYoutubeResponse } from '../interface/youtubeResponse';
const COOKIE = 'VISITOR_INFO1_LIVE=vPl0z_PGHzc; LOGIN_INFO=AFmmF2swRgIhAJlHb9gNiWFpaO13cTNmmD9DJ-8fcDQUuV1-qfdfLexiAiEAvveRfhJ6hUvNvO3uxqnlLiHnAj0ZwDtZUUqvDIYt0n8:QUQ3MjNmeGp6NDVVaTktNkdZdmFhWEszRXI2VzRPYTFXZHVPV3M3YjFPeUJTbXllclNLZlBwdzdZS3BWZzlsYjN1VE0ySFV0MEFvanRSMFd2NnNmVWFzS1VDekYxcTJPczVKM19DVTVsM0k1dkJOSXR2RGdmN1J3eDVCUV8xNzAxMTF5YW55ZzdnaDA5WEVHSzZ0ZmtZX3ppdjhySWdtTEN3; _ga=GA1.1.904857561.1663090222; _ga_VCGEPY40VB=GS1.1.1663090222.1.1.1663090457.0.0.0; DEVICE_INFO=ChxOekU0TmprNU9EYzFPVEl4TlRJNU9ESTVNQT09EMuy9Z0GGMuy9Z0G; HSID=A2d4R4Ek04NJUtMJ6; SSID=A1VRMCfpR9Vy57tQS; APISID=eS6P6SAiAFjriuHL/AUReZzVrPurTpG5L6; SAPISID=9_k6L7_URxZRWyuf/Avzt6nHJ8Sfnz4LhF; __Secure-1PAPISID=9_k6L7_URxZRWyuf/Avzt6nHJ8Sfnz4LhF; __Secure-3PAPISID=9_k6L7_URxZRWyuf/Avzt6nHJ8Sfnz4LhF; PREF=volume=44&f6=40000400&tz=America.Sao_Paulo&autoplay=true&f5=20000&f7=140; SID=VAiNdI5cf4T32gZ3sZ0gKl_uk5d3X68eTv4P63jm-BOR33-ocGhPz77L8G1tJqtSJrD0Ow.; __Secure-1PSID=VAiNdI5cf4T32gZ3sZ0gKl_uk5d3X68eTv4P63jm-BOR33-oDIBYoa2KZc9ygqJch154aw.; __Secure-3PSID=VAiNdI5cf4T32gZ3sZ0gKl_uk5d3X68eTv4P63jm-BOR33-oSUBNA8csD8JAAcXlgoQGHQ.; YSC=DbvprALvmBs; SIDCC=AFvIBn-FBYkKasRL9Z_xtclUHwiRGIDZwFt7UOyPiuuKddMryvWmT9ml0wHcM_guOg_P9yYO3rw; __Secure-1PSIDCC=AFvIBn_EBuH9xNVN_wCxwBXUECvpJYVCNWa212BGJN9Kiovn0a4hD8xlUG3vSzUcppv-6KsO8KBL; __Secure-3PSIDCC=AFvIBn947_MUOr8aZE5fcfnyDrxqVcvf2zonkP6fiFdvfAPYhunQkBNrhPkozCcUVRMWOG5AGtw'

export async function youtubeDownloader(url: string): Promise<iYoutubeResponse> {
    const info = await ytdl.getInfo(url, { requestOptions: { headers: { cookie: COOKIE } } }).catch((err): any => console.error(err));
    const videoFormats = ytdl.filterFormats(info.formats, 'videoonly');

    const uniqueLinks: any = {};

    videoFormats.forEach(format => {
        const { qualityLabel, url } = format;

        if (!uniqueLinks[qualityLabel]) {
            uniqueLinks[qualityLabel] = url;
        }
    });

    const { title, viewCount, ownerChannelName, thumbnails } = info.videoDetails
    const response: iYoutubeResponse = {
        title: title,
        viewCount: viewCount,
        ownerChannelName: ownerChannelName,
        thumbnails: thumbnails[4].url,
        channelUrl: info.videoDetails.author.channel_url,
        downloadUrl: Object.entries(uniqueLinks).map(([quality, url]) => ({ quality, url }))

    }

    return response
}
