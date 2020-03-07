import  React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

function IndexPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")

  const handleClick = e => {
    e.preventDefault()
    setLoading(true)
    fetch("/.netlify/functions/hello-world")
      .then(response => response.json())
      .then(json => {
        setLoading(false)
        setData(json)
      })
      .catch(err => {
        if (window.location.origin === "http://localhost:8000")
          setErr(
            'your origin is "http://localhost:8000". You are likely not using Netlify Dev so the functions server isnt running. Please read the docs, use Netlify Dev, and go to http://localhost:8888'
          )
        else setErr(err)
        throw err
      })
  }

  return (
    <>
    <Layout>
      <SEO title="Home" />
      <button onClick={handleClick}>
        {loading ? "Loading..." : "Call Spotify Function"}
      </button>
      {err && <pre>{JSON.stringify(err, null, 2)}</pre>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
    </>
  )
}
export default IndexPage
