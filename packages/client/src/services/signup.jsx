import axios from "axios"

// const BASE_URL = 'http://localhost:3001/api/users'
const BASE_URL = '/api/users' // Route relative

const signup = async credentials => {
  const { data } = await axios.post(BASE_URL, credentials)
  console.log(data)
  return data
}

export default { signup }