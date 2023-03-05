import axios from "axios"

// const BASE_URL = 'http://localhost:3001/api/notes'
const BASE_URL = '/api/notes' // Route relative

let token = null

const setToke = newToken => {
  token = `Bearer ${newToken}`
}

const userLogged = window.localStorage.getItem('usernameNotAppUser')

const getAll = () => {
  return axios.get(BASE_URL)
  .then((response) => {
      const { data } = response
      const notesFilterByUser = userLogged
        ? data.filter(note => note.user.username === userLogged)
        : []
      return notesFilterByUser
    })
}

const create = (newObject) => {
  const config =  {
    headers: {
      Authorization: token
    }
  }

  return axios.post(BASE_URL, newObject, config)
    .then((response) => {
      const { data } = response
        return data
      })
}

const update = (id, newObject) => {
  const config =  {
    headers: {
      Authorization: token
    }
  }

  return axios.put(`${BASE_URL}/${id}`, newObject, config)
    .then((response) => {
      const { data } = response
        return data
      })
}

const deleteNote = (id) => {
    const config =  {
    headers: {
      Authorization: token
    }
  }

  return axios.delete(`${BASE_URL}/${id}`, config)
    .then((response) => {
      const { data } = response
      return data
    })
}

export default { getAll, create, update, setToke, deleteNote }