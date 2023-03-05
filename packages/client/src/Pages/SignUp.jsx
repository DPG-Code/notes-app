import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import signupService from '../services/signup'
import SignUpForm from '../components/SignUpForm'

export default function SignUp() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const userLogged = window.localStorage.getItem('usernameNotAppUser')


  const handleSignUp = async (e) => {
    e.preventDefault()

    try {
      const user = await signupService.signup({
        username,
        name,
        password
      })

      setUser(user)
      setUsername('')
      setName('')
      setPassword('')

      navigate('/')
    } catch (error) {
      setErrorMessage('User is already created!')
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      </main>
    )
  }

  return (
    <>
      <SignUpForm
        username={username}
        name={name}
        password={password}
        handleUsernameChange={(e) => setUsername(e.target.value)}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handleNameChange={(e) => setName(e.target.value)}
        handleSubmit={handleSignUp}
      />
    </>
  )
}