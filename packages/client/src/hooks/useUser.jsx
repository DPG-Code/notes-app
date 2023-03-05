import { useState, useEffect } from "react"
import noteService from '../services/notes'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'

export const useUser = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedJSON = window.localStorage.getItem('loggedNotAppUser')
    if(loggedJSON) {
      const user = JSON.parse(loggedJSON)
      setUser(user)
      noteService.setToke(user.token)
    }
  }, [])

  const login = async ({ username, password }) => {
    const user = await loginService.login({
      username,
      password
    })

    window.localStorage.setItem(
      'loggedNotAppUser',
      JSON.stringify(user)
    )

    noteService.setToke(user.token)

    setUser(user)
  }

  const logout = () => {
    navigate('/')
    location.reload()
    setUser(null)
    noteService.setToke(user.token)
    window.localStorage.removeItem('loggedNotAppUser')
    window.localStorage.removeItem('usernameNotAppUser')
  }

  return {
    user,
    logout,
    login
  }
}