import { useState } from 'react'
import noteService from '../services/notes'
import loginService from '../services/login'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const userLogged = window.localStorage.getItem('usernameNotAppUser')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNotAppUser',
        JSON.stringify(user)
      )

      window.localStorage.setItem('usernameNotAppUser', username)

      noteService.setToke(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      navigate('/')
      location.reload()
    } catch (error) {
      setErrorMessage('Wrong credentials!')
      setTimeout(() => {
        setErrorMessage(null)
        console.log(user)
      }, 2000);
    }
  }

  if(userLogged !== null) {
    return (
      <main className='Login pt-16 w-full h-auto min-h-screen flex flex-col items-center justify-start'>
        <p className='FontSemibold mt-24 mb-6 text-4xl text-[#FFADAE] text-center   xl:text-6xl'>User is Logged!</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFADAE" className="w-16 h-16   xl:w-24 xl:h-24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
        </svg>
      </main>
    )
  }

  if (errorMessage) {
    return (
      <main className='Login pt-16 w-full h-auto min-h-screen flex flex-col items-center justify-start'>
        <p className='FontSemibold mt-24 mb-6 text-4xl text-[#FFADAE] text-center   xl:text-6xl'>{errorMessage}</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFADAE" className="w-16 h-16   xl:w-24 xl:h-24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </main>
    )
  }

  return (
    <>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={(e) => setUsername(e.target.value)}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handleSubmit={handleLogin}
      />
    </>
  )
}