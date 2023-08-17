import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom'
import Home from './Home'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import NavBar from './NavBar'
import ShowEntry from './ShowEntry'

// INSTALL COMMAND FOR TESTING FRAMEWORK:
// npm i -D vitest jsdom @testing-library/react @testing-library/react-hooks @testing-library/user-event @testing-library/jest-dom

const App = () => {
  const nav = useNavigate()
  const [entries, setEntries] = useState([])

  useEffect( ()  => {
    const fetchEntries = async () => {const res = await fetch(`${import.meta.env.VITE_API_HOST}/entries`)
    const data = await res.json()
    setEntries(data)
    }
    fetchEntries()
  }, [])

  // HOC: Higher order component
  const ShowEntryWrapper = () => {
    const { id } = useParams()
    return < ShowEntry entry={entries[id]} entries={entries} setEntries={setEntries}/>
  }

  async function addEntry(category, content){
    const returnedEntry = await fetch(`${import.meta.env.VITE_API_HOST}/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, content })
    })
    setEntries([...entries, await returnedEntry.json() ])
    nav(`/entry/${[entries.length]}`)
  }

  return <>  
      < NavBar />
      <Routes>
        <Route path='/'  element={< Home entries={entries}/>} />
        <Route path='/category' element={< CategorySelection />} />
        <Route  path='/entry' > 
          
          <Route path=':id' element={ < ShowEntryWrapper />} />
          <Route  path='new/:category' element={< NewEntry addEntry={addEntry} />} />
        </Route>
        <Route path='*' element={<h3>Page Not Found</h3>} />
      </Routes>

</>
  
}

export default App