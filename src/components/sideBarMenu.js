import React from "react"
import PropTypes from "prop-types"

const style = {
  backgroundColor: "lightblue", 
  padding: "10px"
};

const SideBarMenu = ({ children }) => {
  return (
    <>
        <aside style ={style} id ="sideBarMenu">
            {children}
        </aside>
    </>
  )
}

SideBarMenu.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SideBarMenu
