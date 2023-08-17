import React, { useState, useEffect, useReducer } from 'react'
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom'
import Home from './Home'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import NavBar from './NavBar'
import ShowEntry from './ShowEntry'

// INSTALL COMMAND FOR TESTING FRAMEWORK:
// npm i -D vitest jsdom @testing-library/react @testing-library/react-hooks @testing-library/user-event @testing-library/jest-dom

// Reducer function:
// FOLLOWS A COMMAND PATTERN   
function reducer(currentState, action){
  // console.log('current state: ', currentState)
  // console.log('action: ', action)
  switch (action.type) {
    case 'setEntries':
      console.log('set entries')
      return { 
        ...currentState,
        entries: action.entries
      }
  
    default: 
      console.log('default' )
      return currentState
    }
  return currentState
}

const initialState = {
  entries: [],
  categories: [] 
}

const App = () => {
  const nav = useNavigate()
  const [entries, setEntries] = useState([])

  // REDUCER HOOK (ADD TO IMPORT!):
  // TAKES TWO PARAMS: CALLBACK REDUCER FN AND AN INITIAL STATE (USUALLY AN OBJECT)
  // RETURNS: 1) A DATASTORE OF CURRENT STATE(READ ONLY) 2) DISPATCH FUNCTION TO SEND AN ACTION TO THE REDUCER
    const [store, dispatch] = useReducer(reducer, initialState)





  useEffect( ()  => {
    const fetchEntries = async () => {const res = await fetch(`${import.meta.env.VITE_API_HOST}/entries`)
    const data = await res.json()
    setEntries(data)
        // USEREDUCE auto inserts current state, just pass in an action 
        dispatch({
          type: 'setEntries',
          entries: [{category: "Food", content: "pizza is good"}]
        })
        dispatch(42)
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