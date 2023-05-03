import { useState } from "react";

export default function SetIconType() {
    const [icon, setIcon] = useState({
        text: "",
        icon: "",
        type: ""
    })

    function _setIcon(url: string) {
        if (url.includes('twitter')) {
            return setIcon({ icon: "icons/twitter.svg", text: "Twitter Video", type: "twitter" })
        } else if (url.includes('youtube') || url.includes('youtu.be')) {
            return setIcon({ icon: "icons/youtube.svg", text: "Youtube Video", type: "youtube" })
        } else if (url.includes('clips') && url.includes('twitch')) {
            return setIcon({ icon: "icons/twitch.svg", text: "Twitch Clip", type: "twitch" })
        } else {
            return setIcon({ icon: "", text: "", type: "" })
        }
    }

    function getIcon() {
        return icon
    }

    function resetIcon() {
        return setIcon({ icon: "", text: "", type: "" })
    }
    return {
        _setIcon,
        getIcon,
        resetIcon
    }
}