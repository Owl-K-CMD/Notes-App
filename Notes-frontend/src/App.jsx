
import { useEffect, useState } from 'react'
import Note from './components/Note'
import linestyle from './components/line.module.css'
import noteService from './services/notes'


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}



const App = () => {

  const [notes, setNotes ] =useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState("some error happed...")

const hook = () => {
  noteService
  .getAll()
  .then(initialNotes => {
    setNotes(initialNotes)
  })
}

useEffect(hook, [])


  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
         }
     
   noteService
   .create(noteObject)
   .then(returnedNote => {
    setNotes(notes.concat(returnedNote))
    setNewNote('')
   })
  }
  
const handleNoteChange = (event) => {
   setNewNote(event.target.value)
}

const toggleImportanceOf = id => {
  console.log(`importance of  ${id}  needs to be toggled`)
  //const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
  const changedNote = { ...note, important: !note.important }

  noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(n => n.id === id ? returnedNote : n))
      })

      .catch(error => {
        setErrorMessage(
          `note  '${note.content} '  was already deleted from server `
        )
        setTimeout(()      => {
          setErrorMessage(null)
        }, 10000)
        setNotes(notes.filter(n => n.id !== id))
      })


  
}

const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important === false)


  const handleshow = () => {
    setShowAll(!showAll)
  }

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

return (
  <div className="error">
    {message}
  </div>
)
}


return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      



      <button onClick={() => setShowAll(!showAll)}> { /*with function */}
        show {showAll ? 'important' : 'all' }
      </button>

      <button onClick={handleshow}>{ /*without function same as above */}
        show {showAll ? 'important' : 'all' }
      </button>


      <ul>   

        {notesToShow.map((note, i) => {
          return (
<div key = {note.id}>
          
           <Note key={i} 
           note={notes}
           toggleImportance={() => toggleImportanceOf(notes.id)}
           />
           </div>)}
          )}
      </ul>
      
<form onSubmit={addNote}>
  <input 
  value={newNote}
  onChange={handleNoteChange}
  />
  <button type="submit">save</button>
</form>

<Footer />


<div className={linestyle.line}></div>


    </div>
)

}

export default App;