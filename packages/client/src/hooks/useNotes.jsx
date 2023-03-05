import { useState,useEffect } from "react"
import noteService from '../services/notes'

export const useNotes = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    noteService
      .getAll()
      .then((notes) => {
          setNotes(notes)
          setLoading(false)
        }
        )
  }, [])

  const addNote = (noteAdd) => {
    noteService
      .create(noteAdd)
      .then((newNote) => {
        setNotes((prevNotes => [...prevNotes, newNote]))
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

  return noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
  }

  const deleteOneNote = (id) => {
    return noteService
      .deleteNote(id)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  return {
    notes,
    loading,
    addNote,
    toggleImportanceOf,
    deleteOneNote
  }
}