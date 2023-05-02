import axios from "axios";

export async function getTwitchToken() {
    try {
        const data = {
            client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_TWITCH_CLIENT_TOKEN,
            grant_type: 'client_credentials',
            redirect_uri: 'http://localhost',
            response_type: 'token'
        }
        const oauth = await axios.post('https://id.twitch.tv/oauth2/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return oauth.data.access_token
    } catch (err) {
        console.error(err)
        return err
    }
}