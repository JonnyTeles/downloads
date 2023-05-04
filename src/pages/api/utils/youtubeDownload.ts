import ytdl from 'ytdl-core';
import { iYoutubeResponse } from '../interface/youtubeResponse';
const COOKIE = 'VISITOR_INFO1_LIVE=vPl0z_PGHzc; LOGIN_INFO=AFmmF2swRgIhAJlHb9gNiWFpaO13cTNmmD9DJ-8fcDQUuV1-qfdfLexiAiEAvveRfhJ6hUvNvO3uxqnlLiHnAj0ZwDtZUUqvDIYt0n8:QUQ3MjNmeGp6NDVVaTktNkdZdmFhWEszRXI2VzRPYTFXZHVPV3M3YjFPeUJTbXllclNLZlBwdzdZS3BWZzlsYjN1VE0ySFV0MEFvanRSMFd2NnNmVWFzS1VDekYxcTJPczVKM19DVTVsM0k1dkJOSXR2RGdmN1J3eDVCUV8xNzAxMTF5YW55ZzdnaDA5WEVHSzZ0ZmtZX3ppdjhySWdtTEN3; _ga=GA1.1.904857561.1663090222; _ga_VCGEPY40VB=GS1.1.1663090222.1.1.1663090457.0.0.0; DEVICE_INFO=ChxOekU0TmprNU9EYzFPVEl4TlRJNU9ESTVNQT09EMuy9Z0GGMuy9Z0G; HSID=A2d4R4Ek04NJUtMJ6; SSID=A1VRMCfpR9Vy57tQS; APISID=eS6P6SAiAFjriuHL/AUReZzVrPurTpG5L6; SAPISID=9_k6L7_URxZRWyuf/Avzt6nHJ8Sfnz4LhF; __Secure-1PAPISID=9_k6L7_URxZRWyuf/Avzt6nHJ8Sfnz4LhF; __Secure-3PAPISID=9_k6L7_URxZRWyuf/Avzt6nHJ8Sfnz4LhF; PREF=volume=44&f6=40000400&tz=America.Sao_Paulo&autoplay=true&f5=20000&f7=140; SID=VAiNdI5cf4T32gZ3sZ0gKl_uk5d3X68eTv4P63jm-BOR33-ocGhPz77L8G1tJqtSJrD0Ow.; __Secure-1PSID=VAiNdI5cf4T32gZ3sZ0gKl_uk5d3X68eTv4P63jm-BOR33-oDIBYoa2KZc9ygqJch154aw.; __Secure-3PSID=VAiNdI5cf4T32gZ3sZ0gKl_uk5d3X68eTv4P63jm-BOR33-oSUBNA8csD8JAAcXlgoQGHQ.; YSC=KbkOmy5W3Rk; CONSISTENCY=ACeCFAVpEDA82hkthHb3LAsEiMVabsF_RsdpgaLvAPwcsQzTOKsQEBpA67KIq-TfhdtJQN9avgxqOeFNE5oURhCoBNh5Xn3TYTAhI4Ctskq-PayG9EwvX6g4d408jgMoC-yJHkgEI7LlGn_SsKdBCrmN; ST-1w31zmx=itct=CLsFENwwGAIiEwjP-_zW8dn-AhUquZUCHTjqDDIyBnNlYXJjaFINZ3RhIHYgdHJhaWxlcpoBAxD0JA==&csn=MC4yMjk5NDk3ODc4Nzk4MTkxMg..&endpoint={"clickTrackingParams":"CLsFENwwGAIiEwjP-_zW8dn-AhUquZUCHTjqDDIyBnNlYXJjaFINZ3RhIHYgdHJhaWxlcpoBAxD0JA==","commandMetadata":{"webCommandMetadata":{"url":"/watch?v=QkkoHAzjnUs&pp=ygUNZ3RhIHYgdHJhaWxlcg%3D%3D","webPageType":"WEB_PAGE_TYPE_WATCH","rootVe":3832}},"watchEndpoint":{"videoId":"QkkoHAzjnUs","params":"qgMNZ3RhIHYgdHJhaWxlcroDCgiD6Irgu_Kkuna6AwsIw_vkwt79gP2GAboDCgiG0uqZufiV0x66AwsIoJPYuP3E0r2AAboDCwiA0o6xtuOamNwBugMLCN2R1dXb7uKp7wG6AwoI65PP9NXgv6lAugMKCJ-rxr7839CsKroDCgjLkYG8h-_w1F66AwoI4ITTl7eVsM8lugMLCJ6xo8eCvdX19gG6AwoIntG_8vfwrYcNugMKCJmWkIq2rtvcCroDCgjWhqnglMaGvFq6AwsI06mOjKC5udWfAboDCwj8yebfr5Cei4sBugMLCIu01p-dwKKp_QG6AwsInqGr7qqIvIW_AboDCgjql_zq5Ynq3W-6AwoIjOztlZXC2YscugMKCIqV0Nur5--uAboDCwiEmdGSubvo2q4BugMLCJmgrquIte7BgAG6AwsIhdH7x-HF1vjIAboDCwj0x5ufnZuBxYMBugMKCM6o25zElq3PEboDCwiVwo6kxaL105cBugMKCJXh3ri9kMi9croDCwjq0tGO2fKsupUBugMKCJaI2vC-msvTK7oDCgjzjK__-5m-sTy6AwsI8uXj9c-R2M6fAboDCgiw9fDsxY33iWO6AwsIztG-nZ6fydSDAboDCwjIl4SGytSuvLcBugMLCPyE88Pr242cvgG6AwsIuJTTm6Pz6K75AboDCwiL0v7xstmBlrkBugMLCNrD-eyPk_XW-QG6AwoIpZ7B1ODVkch0ugMKCMeTx96ynr_kK7oDCgiNqLaYutqLpDG6AwsIvIqunsXfr-DIAboDCwjGsY-BpKux4OcBugMLCMfCsfDK36vO6wG6AwsI_KipvpuT__iGAboDCwj30cTW7ZXSwf0BugMKCLLTyrWsk-P7ILoDCwjXkaC2mKHB0rIBugMLCOv9soiO7dj1ngG6AwoIouS8sOKD__4FugMLCJOc6qmG6Lr-kQG6AwoI1pOHx4LB8NVxugMKCOK6g92v7pH2N7oDCgjWhqnglMaGvFq6AwsI06mOjKC5udWfAboDCwj8yebfr5Cei4sBugMLCIu01p-dwKKp_QG6AwsInqGr7qqIvIW_AboDCgjql_zq5Ynq3W-6AwoIjOztlZXC2YscugMKCIqV0Nur5--uAboDCwiEmdGSubvo2q4BugMLCJmgrquIte7BgAG6AwsIl6D87b2X-IvGAboDCgifyNr1y9PQ3WK6AwoIg5ub1-yS5YFcugMLCOTH8PaPifONhAG6AwoIouaAnoat0PsS8gMFDfhQ7D4%3D","playerParams":"ygUNZ3RhIHYgdHJhaWxlcg%3D%3D","watchEndpointSupportedOnesieConfig":{"html5PlaybackOnesieConfig":{"commonConfig":{"url":"https://rr2---sn-g515vpo4vcg-24cl.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=4249281c0ce39d4b&ip=177.11.161.133&initcwndbps=951250&mt=1683141926&oweuc="}}}}}; SIDCC=AP8dLtz46fM0rtvp3EGKZorBXJcrTDKsVzLjyfv1SANtIbyIPADA5l6IyJ6eykULvvkZbpQL0OA; __Secure-1PSIDCC=AP8dLtyy5EN4pFSjzNBDL5AtOLRLpeC5g2_mAhr9baLOYDPbVo1Pg8OGEqdw5gqnsOwtDvb6x_q4; __Secure-3PSIDCC=AP8dLtx5zfd_Z98ZVp1bYI0aPxtOv6l7WlyNBt9gFwOxPeKG35HmSs1XbSFjgJ8uYzw8pS0Rf8s'

export async function youtubeDownloader(url: string): Promise<iYoutubeResponse> {
    const info = await ytdl.getInfo(url, { requestOptions: { headers: { cookie: COOKIE } } }).catch((err): any => console.error(err));
    const videoFormats = ytdl.filterFormats(info.formats, 'audioandvideo');
    const mp3 = ytdl.filterFormats(info.formats, 'audioonly');
    const uniqueLinks: any = {};

    videoFormats.forEach(format => {
        const { qualityLabel, url } = format;

        if (!uniqueLinks[qualityLabel]) {
            uniqueLinks[qualityLabel] = url;
        }
    });

    const { title, viewCount, ownerChannelName, thumbnails } = info.videoDetails

    const links: any = [];

    videoFormats.forEach(format => {
        const { qualityLabel, url } = format;
        if (qualityLabel && !links.some((link: any) => link.quality === qualityLabel)) {
            links.push({ quality: qualityLabel, url });
        }
    });
    links.push({ quality: 'mp3', url: mp3[0].url });

    const response: iYoutubeResponse = {
        title: title,
        viewCount: viewCount,
        ownerChannelName: ownerChannelName,
        thumbnails: thumbnails[4].url,
        channelUrl: info.videoDetails.author.channel_url,
        downloadUrl: links
    }

    return response
}
