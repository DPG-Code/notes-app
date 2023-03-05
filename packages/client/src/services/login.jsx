import axios from "axios"

// const BASE_URL = 'http://localhost:3001/api/login'
const BASE_URL = '/api/login' // Route relative

const login = async credentials => {
  const { data } = await axios.post(BASE_URL, credentials)
  return data
}

export default { login }