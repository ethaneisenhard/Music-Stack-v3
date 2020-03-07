'use strict';
const fetch = require ('node-fetch');

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET_ID,
  SPOTIFY_REDIRECT_URI
} = process.env;

exports.handler = (event, context, callback) => {

  let params = event.queryStringParameters;
  const code = params.code;

  let done = (err, res) => {
    if (err) {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          type: "error"
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
        }
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          type: "success",
          done: res
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
        }
      });
    }
  };

  let getAccessToken = code => {
    let url = "https://accounts.spotify.com/api/token";
    let encoded = new Buffer(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET_ID).toString(
      "base64"
    );
    console.log("encoded = " + encoded);

    let params = {
      grant_type: "authorization_code",
      code: code, 
      redirect_uri: SPOTIFY_REDIRECT_URI
    };

    const formParams = Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");

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
        done(null, {
          json: json
        });
      })
      .catch(error => {
        done({
          error: error
        });
      });
  };


  try {
    getAccessToken(code);
  } catch (error) {
    done(error);
  }
  
};
