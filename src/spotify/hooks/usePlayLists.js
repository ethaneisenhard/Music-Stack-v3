import { useQuery } from "react-query";
import SpotifyWebApi from "spotify-web-api-js"

const getPlaylists = async () => {
  
  const localToken = localStorage.getItem('token');

  var spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(localToken);

  let response = await spotifyApi.getUserPlaylists() 
  .then(function(data) {
      
    // var songs = data.items.map(function(item, index){
    //     return data.items[index].album.name
    // })
  return data

  }, function(err) {
    console.error(err);
  });

  return response;

};

export default function usePlaylists() {
  return useQuery("playlists", getPlaylists);
}
