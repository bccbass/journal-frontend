import React, {useState} from 'react'
import { useParams } from 'react-router-dom'

const NewEntry = ({ addEntry }) => {
    const { category } = useParams()
    const [content, setContent] = useState('')

    const submit = e => {
        e.preventDefault()
        addEntry(category, content)
    }

return (
<>
<h3>New entry in {category} category</h3>  
<form action="" className='container' onSubmit={submit}>
    <div>
    <textarea value={content} onChange={e => setContent(e.target.value)} className='form-control' rows="8" name=""></textarea>
    </div>
    <button className='btn btn-primary mt-2'>Create Entry</button>
</form>

</>
)
}

export default NewEntry