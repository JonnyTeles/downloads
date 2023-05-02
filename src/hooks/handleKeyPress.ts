export default function HandleKeyPress({ handleUrl }: { handleUrl: (url: string) => void }) {
    function handleKeyPress(event: any, url: string) {
        if (event.key === 'Enter') {
            handleUrl(url)
        }
    }

    return {
        handleKeyPress,
    }
}