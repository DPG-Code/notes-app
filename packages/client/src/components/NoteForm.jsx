import React from 'react'
import { useRef, useState } from "react"
import Togglable from "./Togglable"

export default function NoteForm({ addNote }) {
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const togglableRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    const noteAdd = {
      content,
      description,
      important: false
    }

    addNote(noteAdd)
    setContent('')
    setDescription('')
    togglableRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='New Note' ref={togglableRef}>
      <h2 className='FontSemibold mx-auto mb-6 text-2xl text-[#D5BAFE]'>Create New Note</h2>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
        <input
          className="mb-2 bg-transparent border-2 border-[#F2F2F2ac] text-[#F2F2F2] placeholder-[#F2F2F2ec] outline-none text-sm rounded-2xl block w-full px-4 py-2"
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          name="content-note"
          placeholder="Title"
        />
        <input
          className="mb-6 bg-transparent border-2 border-[#F2F2F2ac] text-[#F2F2F2] placeholder-[#F2F2F2ec] outline-none text-sm rounded-2xl block w-full px-4 py-2"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          name="content-note"
          placeholder="Write your new Note..."
        />
        <button
          id="form-note-button"
          className="FontSemibold mb-2 text-[#1D1C21] bg-[#D5BAFE] border-2 border-[#D5BAFE] rounded-2xl text-sm px-6 py-1 flex items-center justify-center gap-2"
        >
          Add note
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1D1C21" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </button>
      </form>
    </Togglable>
  )
}