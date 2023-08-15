import React from 'react'
import { useNavigate } from 'react-router-dom'

const ShowEntry = ({ entry, entries, setEntries }) => {
const nav = useNavigate()
return entry ? <>
    <h5>{entry.content}</h5>
    <p>Posted in {entry.category.name}</p>
    <button className='btn btn-danger' onClick={async () => { 
      await fetch(`http://localhost:4001/entries/${entry._id}`, {method: 'DELETE'})
      setEntries(entries.filter(targetEntry => targetEntry._id != entry._id))
      nav(`/`)
     }}>Delete Post</button>
  </> : <p>Entry not found </p>
}

export default ShowEntry