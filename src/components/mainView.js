import React from "react"
import PropTypes from "prop-types"
import "./layout.css"

const viewContainerStyle = {
  padding: "10px",
  width: "100%", 
  overflow: "auto",
  display: "flex",
  flexFlow: "column"
};

const songContainerStyle = {
  padding: "10px",
  width: "100%", 
  display: "flex"
};

const MainApp = ({ children }) => {
  return (
    <>
        <section style={viewContainerStyle}>
          <header>
            <h1 style={{"textAlign": "center"}}>Main View</h1>
          </header>
          <section style={songContainerStyle}>
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