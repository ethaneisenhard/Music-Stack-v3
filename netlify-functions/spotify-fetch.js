'use strict';
const fetch = require ('node-fetch');

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
// const SPOTIFY_REDIRECT_URI ="http://localhost:8888/.netlify/functions/spotify-fetch";
const SPOTIFY_CLIENT_SECRET_ID = process.env.SPOTIFY_CLIENT_SECRET_ID;

exports.handler = async event => {
  let params = event.queryStringParameters;
  const code = params.code;
 
  let token;
  try {
    token = await getAccessToken(code);
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        error: "I AM AN ERROR MESSAGE"
      })
    };
  }

  async function getAccessToken(code) {
    let url = "https://accounts.spotify.com/api/token";
    let encoded = new Buffer(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET_ID).toString("base64");

    let params = {
      code: code, 
      redirect_uri: SPOTIFY_REDIRECT_URI, 
      grant_type: "authorization_code",
    };

    const formParams = Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');

    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + encoded,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formParams
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        var access_token = json.access_token
        return access_token
      })
      .catch(error => {
        console.log(error)
      });
  }

  return {
    statusCode: 302,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Cache-Control": "no-cache",
      Location: `${"http://localhost:8888/music"}?token=${token}`
    },
    body: JSON.stringify({})
  };
}