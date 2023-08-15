import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ entries }) => {
  return <>
    <h2>Journal Entries</h2>
    <ul>
    {entries.map((entry, i) => <li key={i}><Link to={`/entry/${i}`}>{entry.content}</Link></li>)}
    </ul>
  </>
}

export default Home