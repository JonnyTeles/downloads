export interface iDownloadCard {
    link: string
    back?: () => void
    thumb: string
    title: string,
    channel: string,
    views: number,
}