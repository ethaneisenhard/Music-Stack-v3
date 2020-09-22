import React, {useContext} from "react"
import useTopSongs from "../hooks/useTopSongs"
import { addToQueueSpotify } from "../requests/addToQueueSpotify"
import { QueueContext } from "../../components/QueueContext.js"

function TopSongs(){
  const { status, data, error, isFetching } = useTopSongs();
  const {playSong, setPlaySong} = useContext(QueueContext)

  const localToken = localStorage.getItem('token');

  const handleOnClick = (event) => {
        var getSongURI = event.target.getAttribute("data-song")
        setPlaySong(getSongURI)
    } 

    const handleAddToQueue = (event) => {
    let getSongURI = event.target.getAttribute("data-song")

    addToQueueSpotify(getSongURI, localToken)
    } 

  return (
    <>
      {status === "loading" && "Loading..."}
      {status === error && <p>{error.message}</p>}
      {status === "success" && (
        <div>
          <h2>TopSongs</h2>
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

export default TopSongs
