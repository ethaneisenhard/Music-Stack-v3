import React, { useContext } from "react"
import useTopSongs from "../hooks/useTopSongs"
import { addToQueueSpotify } from "../requests/addToQueueSpotify"
import { QueueContext } from "../../components/QueueContext.js"

function TopSongs() {
  const { status, data, error, isFetching } = useTopSongs()
  const { playSong, setPlaySong } = useContext(QueueContext)

  const localToken = localStorage.getItem("token")

  const handleOnClick = event => {
    var getSongURI = event.target.getAttribute("data-song")
    setPlaySong(getSongURI)
  }

  const handleAddToQueue = event => {
    let getSongURI = event.target.getAttribute("data-song")

    addToQueueSpotify(getSongURI, localToken)
  }

  console.log(data)

  return (
    <>
      {status === "loading" && "Loading..."}
      {status === error && <p>{error.message}</p>}
      {status === "success" && (
        <>
          {data.items.map(function(item, index) {
            const name = data.items[index].name
            const uri = data.items[index].uri
            const artist = data.items[index].album.artists[0].name;
            const artistLink = data.items[index].album.artists[0].external_urls.spotify;
            const albumCover = data.items[index].album.images[0].url;
            const externalSongURL = data.items[index].external_urls.spotify;
            const songID = data.items[index].id

            return (
              <div className = "song" key={songID}>
                <div className = "artist-info">
                  <a href = {externalSongURL} target="_blank" className="song-name">{name}</a>
                  <a href = {artistLink} target="_blank" className="artist-name">{artist}</a>
                </div>
                <img className = "album-cover" src={albumCover} alt=""/>
                <div className="buttonsContainer">  
                  <button
                    onClick={handleOnClick}
                    className="btn-top-song"
                    data-song={uri}
                  >
                    Play
                  </button>
                  <button
                    onClick={handleAddToQueue}
                    className="btn-add-queue"
                    data-song={uri}
                  >
                    Add To Queue
                  </button>
                </div>
              </div>
            )
          })}
        </>
      )}
    </>
  )
}

export default TopSongs
