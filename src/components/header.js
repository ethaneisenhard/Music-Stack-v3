import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const headerStyle = {
  backgroundColor: "grey",
  height: "5vh"
};

const Header = ({ siteTitle }) => (
  <header style={headerStyle}>
    <div>
      <Link to="/">{siteTitle}</Link>
      <Link to="/music">{"/music"}</Link>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
