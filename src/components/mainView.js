import React from "react"
import PropTypes from "prop-types"

const viewContainerStyle = {
  padding: "10px",
  overflow: "auto",
  display: "flex",
  flexFlow: "column"
};

const MainApp = ({ children }) => {
  return (
    <>
        <section style={viewContainerStyle}>
          <header>
            <h1 style={{"textAlign": "center", "marginBottom": ".5em"}}>Top 20 Spotify Songs</h1>
            <p style={{"textAlign": "center", "fontSize": "18px"}}>Change device, in bottom right corner of the play bar, to Spotify Web Player to use in the Browser</p>
          </header>
          <section className="songContainer">
              {children}
          </section>
        </section>
    </>
  )
}

MainApp.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainApp