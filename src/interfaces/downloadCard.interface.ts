export interface iDownloadCard {
    link: string
    originalUrl: string
    channelLink: string
    back?: () => void
    thumb: string
    title: string,
    channel: string,
    views: number,
    youtube: boolean
}