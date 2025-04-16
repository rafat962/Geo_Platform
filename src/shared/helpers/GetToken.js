import { client_id, client_secret } from "../../environment/devolpmentApi";

async function getToken() {
    const params = new URLSearchParams();
    params.set("client_id", client_id); // Replace with your actual Client ID
    params.set("client_secret", client_secret); // Replace with your actual Client Secret
    params.set("grant_type", "client_credentials"); // Use client_credentials grant type
    params.set("f", "json"); // Format response as JSON
    params.set("expiration", "7200"); // Set the token to expire in 2 hours (120 minutes)
    const res = await fetch(
        `https://www.arcgis.com/sharing/rest/oauth2/token?${params.toString()}`,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    const Data = await res.json();
    localStorage.setItem("LayerToken", JSON.stringify(Data.access_token));
}
export default getToken;
