import React, {useContext} from "react"
import usePlayLists from "../hooks/usePlayLists.js"
import { addToQueueSpotify } from "../requests/addToQueueSpotify.js"
import { QueueContext } from "../../components/QueueContext.js"

function PlayLists() {
  const { status, data, error, isFetching } = usePlayLists()

  const {playSong, setPlaySong} = useContext(QueueContext)

  const localToken = localStorage.getItem("token")

  const handleOnClick = event => {
    var getSongURI = event.target.getAttribute("data-song")
    localStorage.setItem("playURI", getSongURI)
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
          <h2>Playlists</h2>
          {data.items.map(function(item, index) {
            const name = data.items[index].name
            const uri = data.items[index].uri
            return (
              <div key={data.items[index].uri}>
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

export default PlayLists
