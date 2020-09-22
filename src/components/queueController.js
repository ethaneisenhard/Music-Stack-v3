import React from "react"
import PropTypes from "prop-types"
import "./layout.css"

const style = {
    position: "absolute",
    bottom: "0",
    width: "97%"
};

const QueueController = ({ children }) => {
  return (
    <>
        <section  style={style} id ="QueueController">
            {children}
        </section>
    </>
  )
}

QueueController.propTypes = {
  children: PropTypes.node.isRequired,
}

export default QueueController