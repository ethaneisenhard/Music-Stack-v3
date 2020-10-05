import React from "react"
import PropTypes from "prop-types"

const style = {
    position: "fixed",
    bottom: "0",
    width: "100%"
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