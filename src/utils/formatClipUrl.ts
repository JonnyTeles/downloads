export async function formatClipUrl(url: string): Promise<string> {
    try {
        const previewIndex = url.indexOf("-preview");
        if (previewIndex !== -1) {
            return url.substring(0, previewIndex) + ".mp4";
        }
        return url;
    } catch (err) {
        const errorMessage = `${err}`;
        console.error('\x1b[31m', errorMessage);
        throw new Error(errorMessage);
    }
}

export async function getClipId(url: string): Promise<string> {
    const regex = /(?:clip\/|clip%2F|clips\.twitch\.tv\/)([a-zA-Z0-9_-]*)/;
    const match = url.match(regex);
    if (match) {
        return match[1];
    } else {
        const errorMessage = `URL INVÁLIDA`;
        throw new Error(errorMessage);
    }
   
}