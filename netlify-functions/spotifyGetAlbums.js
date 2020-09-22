'use strict';
const fetch = require ('node-fetch');

exports.handler = async event => {
  let params = event.queryStringParameters;
  const token = params.token;

  let albums;
  try {
    albums = await getAlbums(token);
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

  async function getAlbums(token) {
    let url = "https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ,6JWc4iAiJ9FjyK0B59ABb4,6UXCm6bOO4gFlDQZV5yL37"


    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Authorization: Bearer " + token
      }
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json
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
      Location: `${"http://localhost:8888/music"}?json=${json}`
    },
    body: JSON.stringify({})
  };
}