import { useState } from 'react'
import Note from './components/Note'
import Loader from './components/Loaders'
import NoteForm from './components/NoteForm'
import { useNotes } from './hooks/useNotes'
import { useUser } from './hooks/useUser'
import { useLogout } from './context/logoutContext'
import getDate from './date'

export default function Notes() {
  const { user, logout } = useUser()
  const { notes, loading, addNote, toggleImportanceOf, deleteOneNote } = useNotes()
  const [ showLogout ] = useLogout()

  const [errorMessage, setErrorMessage] = useState('')
  const [showAll, setShowAll] = useState(true)

  const { day, date } = getDate()

  const toggleImportanceOfNote = (id) => {
    toggleImportanceOf(id) // hook
      .catch(() => {
        setErrorMessage(`Note was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  
  const deleteNoteFromDb = (id) => {
    deleteOneNote(id)
    .catch(() => {
      setErrorMessage(`Note dont exists`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const handleLogout = () => {
    logout()
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
  

  const NotesToRender = () => {
    return ( loading
      ? <Loader />
      : <ol className='notes-container w-full gap-12'>
          { notesToShow.map((note) => (
              <Note
                key={note.id}
                {...note}
                toggleImportance={() => toggleImportanceOfNote(note.id)}
                deleteNote={() => deleteNoteFromDb(note.id)}
              /> // don't use index for id
            ))
          }
        </ol>
    )
  }

  return (
    <div className="App w-full h-auto min-h-screen flex flex-col justify-start relative">
      <h2 className="FontSemibold mt-24 px-6 text-6xl text-[#D5BAFE] text-left   sm:px-24   xl:mt-32 xl:text-8xl   2xl:px-36">{day}</h2>
      <h3 className={`FontLight ${errorMessage !== '' ? 'mb-6' : ''} px-6 text-lg text-[#F2F2F2] text-left   sm:px-24   xl:text-2xl   2xl:px-36`}>{date}</h3>

    {
      errorMessage !== ''
        ? <div className='modal-warnig mx-auto px-6 py-1 bg-[#2E2C33] flex items-center justify-center gap-2 rounded-2xl   xl:rounded-3xl'>
            <h3 className='FontLight text-lg text-[#3CEAE6]   xl:text-xl'>{errorMessage}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#3CEAE6" className="w-5 h-5   xl:w-7 xl:h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
        : ''
    }

      <section className='mb-16 px-6 w-full flex flex-col items-center justify-start   sm:px-24 sm:items-start   2xl:px-36'>
        {
          user
          ? <>
            <section className='my-8 flex items-center gap-4   xl:my-12'>
              <button
                className='FontSemibold text-[#F2F2F2] border-2 border-[#F2F2F2] hover:bg-[#F2F2F2] hover:text-[#1D1C21] rounded-2xl text-sm px-6 py-1 text-center   xl:rounded-3xl xl:text-xl'
                onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Important' : 'Show All'}
              </button>
            </section>
            <NotesToRender />
          </>
          : null
        }
      </section>

      {
        user
        ? <>
          <NoteForm
            addNote={addNote}
            handleLogout={handleLogout}
          />
          {
            showLogout
              ? <button
                  onClick={handleLogout}
                  className="FontSemibold text-[#1D1C21] border-2 border-[#D5BAFE] bg-[#D5BAFE] rounded-2xl text-sm px-6 py-1 text-center absolute top-16 right-6   sm:right-24   xl:top-24   2xl:right-36"
                >
                  Logout
                </button>
              : ''
          }
        </>
        : <div className='flex flex-col items-center justify-center'>
            <h3 className="my-4 text-2xl text-[#F2F2F2] text-center   xl:text-5xl">Login for create a new Note</h3>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#F2F2F2" className="w-12 h-12   xl:w-20 xl:h-20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
            </svg>
        </div>
      }
    </div>
  )
}