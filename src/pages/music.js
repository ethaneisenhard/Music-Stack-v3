import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SpotifyPlayer from "react-spotify-web-playback"
import Playlists from "../spotify/components/playLists.js"
import TopSongs from "../spotify/components/topSongs.js"
import SideBarMenu from "../components/sideBarMenu"
import MainView from "../components/mainView"
import QueueController from "../components/queueController"
import { QueueContext } from "../components/QueueContext"
import SavedTracks from "../spotify/components/savedTracks"

function Music() {
  let url_string = window.location.href
  let url = new URL(url_string)
  const token = url.searchParams.get("token")

  localStorage.setItem("token", token)
  const localToken = localStorage.getItem("token")

  const [playSong, setPlaySong] = useState(null)

  return (
    <Layout>
      <SEO title="Top 20 Spotify Songs" />

      <QueueContext.Provider value={{ playSong, setPlaySong }}>

        <MainView>
          <TopSongs />
        </MainView>

        <QueueController>
          <SpotifyPlayer
            styles={{
              bgColor: "#333",
              color: "#fff",
              loaderColor: "#fff",
              sliderColor: "#1cb954",
              savedColor: "#fff",
              trackArtistColor: "#ccc",
              trackNameColor: "#fff",
            }}
            token={localToken}
            uris={[playSong]}
          />
        </QueueController>
      </QueueContext.Provider>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre>
          <div>{isFetching ? "Background Updating..." : " "}</div> */}
      {/* <pre>{JSON.stringify(albumData.items[0].album, null, 2)}</pre> */}
    </Layout>
  )
}

export default Music
