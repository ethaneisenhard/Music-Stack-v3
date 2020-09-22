exports.handler = async (event, context) => {

  let spotifyConsentURL;
   try {
     spotifyConsentURL = await authorize();
   } catch (e) {
     return {
       statusCode: 500,
       headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Credentials": true
       },
       body: JSON.stringify({
         error: e.message
       })
     };
   }
   return {
     statusCode: 200,
     headers: {
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Credentials": true,
       "Cache-Control": "no-cache",
       "Content-Type": "text/html"
     },
     body: JSON.stringify({ spotifyConsentURL })
  };

 function authorize() {
  const SPOTIFY_CLIENT_ID ="2e1b117716b64365ac848c74c13e67a0";
  const SPOTIFY_REDIRECT_URI ="http://localhost:8888/.netlify/functions/spotify-fetch";
  const SPOTIFY_CLIENT_SECRET_ID ="dd393977f4aa4630b9f5aab2d734b88a";

  let scope = ["user-read-private", "user-read-email", "user-library-read", "user-top-read", "streaming", "user-read-playback-state", "user-modify-playback-state", "user-library-modify", "playlist-read-collaborative"]

  var scopeList = scope.join("%20");
  
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=${scopeList}&state=34fFs29kd09`;
 
   return authUrl;
 }

};