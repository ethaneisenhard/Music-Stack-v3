import React, { useState } from "react"
import { Link } from "gatsby"
import SEO from "../components/seo"
import "../styles/global.css"
import "../styles/home.css"
import SpotifyLogo from "../images/Spotify.png"

function IndexPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  const handleClick = e => {
    const agreeToSpotfiyBTN = document.querySelector(".signInToSpotify");
    e.preventDefault()
    setLoading(true)
    fetch("/.netlify/functions/spotify-auth")
      .then(response => response.json())
      .then(json => {
        setLoading(false)
        setData(json.spotifyConsentURL)
        agreeToSpotfiyBTN.classList.remove("is-hidden");
      })
      .catch(err => {
        if (window.location.origin === "http://localhost:8000")
          setErr(
            'your origin is "http://localhost:8000". You are likely not using Netlify Dev so the functions server isnt running. Please read the docs, use Netlify Dev, and go to http://localhost:8888'
          )
        else setErr(err)

        throw err
      })
  }

  return (
    <>
      <main class = "home">
        <SEO title="Top 20 Spotify Songs" />
        <h1>Find Out Your Top 20 Most Played Songs on Spotify</h1>
        <button onClick={handleClick}>
          {loading ? "Loading..." : "Register to Sign Into Spotify"}
        </button>
        <a className = "signInToSpotify is-hidden" href={data}>
          Login Using 
          <img src ={SpotifyLogo}></img>
          </a>
        {err && <pre>{JSON.stringify(err, null, 2)}</pre>}
        <a href = "https://ethaneisenhard.com/" rel="noopener" target="_blank">Built By Ethan Eisenhard</a>
      </main>
    </>
  )
}
export default IndexPage
