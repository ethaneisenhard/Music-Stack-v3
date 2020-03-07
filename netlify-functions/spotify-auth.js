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
   const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET_ID, SPOTIFY_REDIRECT_URI } = process.env;
 
   const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=user-read-private%20user-read-email&state=34fFs29kd09`;
 
   return authUrl;
 }
 

};