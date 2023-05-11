export interface iCard {
    title: string,
    image: string,
    height?: string,
    alt?: string,
    description?: string,
    buttonText: string,
    youtube: boolean,
    twitter: boolean,
    onClick?: () => void
}