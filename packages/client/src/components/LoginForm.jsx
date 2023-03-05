import PropTypes from 'prop-types'
import { useState } from 'react'

export default function LoginForm({ handleSubmit, handleUsernameChange, username, handlePasswordChange, password }) {
  const [showPassword, setShowPassword] = useState(false)

  const iconPassword = showPassword
    ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F2F2F2" className="w-5 h-5   xl:w-7 xl:h7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F2F2F2" className="w-5 h-5   xl:w-7 xl:h7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
  
  return (
    <main className='Login pt-16 w-full h-auto min-h-screen flex flex-col items-center justify-start   xl:pt-32'>
        <h2 className='FontSemibold my-6 w-[400px] text-[#D5BAFE] text-5xl text-left   xl:my-10 xl:text-7xl xl:w-[700px]'>Sign in</h2>
        <form onSubmit={handleSubmit} className="w-[400px] flex flex-col items-center justify-center   xl:w-[700px]">
          <input
            className="mb-6 bg-[#1D1C218c] border-2 border-[#F2F2F2] text-[#F2F2F2] placeholder-[#F2F2F2ec] outline-none text-sm rounded-2xl block w-full px-4 py-2   xl:text-lg xl:rounded-4xl xl:px-5 xl:py-3"
            type="text"
            onChange={handleUsernameChange}
            value={username}
            name="username"
            placeholder="username"
          />
          <div className='w-full flex items-center relative'>
            <input
              className="bg-[#1D1C218c] border-2 border-[#F2F2F2] text-[#F2F2F2] placeholder-[#F2F2F2ec] outline-none text-sm rounded-2xl block w-full px-4 py-2   xl:text-lg xl:rounded-4xl xl:px-5 xl:py-3"
              type={`${showPassword ? 'text' : 'password' }`}
              onChange={handlePasswordChange}
              value={password}
              name="password"
              placeholder="password"
            />
            <button
              className='absolute right-4'
              type='button'
              onClick={() => setShowPassword(showPassword ? false : !showPassword)}
            >
              {iconPassword}
            </button>
          </div>
          <button
            type='submit'
            id='form-login-button'
            className="FontSemibold mt-6 text-[#1D1C21] bg-[#D5BAFE] border-2 border-[#D5BAFE] rounded-2xl text-sm px-6 py-1 text-center flex items-center justify-center gap-1   xl:text-xl xl:rounded-3xl"
          >
            Login
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#1D1C21" className="w-4 h-4   xl:w-7 xl:h7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </button>
        </form>
    </main>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleUsernameChange: PropTypes.func,
  handlePasswordChange: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string
}