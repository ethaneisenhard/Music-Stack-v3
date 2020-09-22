import axios from "axios"

export function addToQueueSpotify(uri, token, deviceId) {
    const url = "https://api.spotify.com/v1/me/player/queue?uri=" + uri
    
    const config = {
      headers: {
        "Authorization": "Bearer " + token,
        'content-type': 'application/json'
      }
    }
  
    axios.post(url, "", config)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}