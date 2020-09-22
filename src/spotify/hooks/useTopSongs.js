import { useQuery } from "react-query"
import SpotifyWebApi from "spotify-web-api-js"

const getTopSongs = async () => {
  const localToken = localStorage.getItem("token")

  var spotifyApi = new SpotifyWebApi()
  spotifyApi.setAccessToken(localToken)

  let response = await spotifyApi.getMyTopTracks().then(
    function(data) {
      return data
    },
    function(err) {
      console.error(err)
    }
  )

  return response
}

export default function useTopSongs() {
  return useQuery("topSongs", getTopSongs)
}
