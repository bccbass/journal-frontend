import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const CategorySelection = () => {
    const [categories, setCategories] = useState([])
        useEffect( ()  => {
            // IIFE (immediately invoked function expression):
            (async () => {
                const res = await fetch(`${import.meta.env.VITE_API_HOST}/categories`)
                const data = await res.json()
                setCategories(data)
            })()
          }, [])
  return (
    <>  
    <h3>Choose a Category:</h3>
    <ul>
  {  categories.map(cat =>(
        <li key={cat._id}>
            <Link to={`/entry/new/${cat.name}`}>{cat.name}</Link>
        </li>)
    )}

</ul>
    </>

    )
  }


export default CategorySelection