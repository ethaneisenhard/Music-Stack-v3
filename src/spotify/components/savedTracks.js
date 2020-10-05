import React, { useContext } from "react"
import useSavedTracks from "../hooks/useSavedTracks"
import { addToQueueSpotify } from "../requests/addToQueueSpotify"
import { QueueContext } from "../../components/QueueContext.js"

function SavedTracks() {
  const { status, data, error, isFetching } = useSavedTracks()
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

  return (
    <>
      {status === "loading" && "Loading..."}
      {status === error && <p>{error.message}</p>}
      {status === "success" && (
        <div>
          <h2>SavedTracks</h2>
          {data.items.map(function(item, index) {
            const name = data.items[index].track.name
            const uri = data.items[index].track.uri
            const songID = data.items[index].track.id
            return (
              <div key={songID}>
                <button
                  onClick={handleOnClick}
                  className="btn-top-song"
                  data-song={uri}
                >
                  {name}
                </button>
                <button
                  onClick={handleAddToQueue}
                  className="btn-add-queue"
                  data-song={uri}
                >
                  Add To Queue
                </button>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default SavedTracks
