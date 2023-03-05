const days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]

const getDate = () => {
  const day = new Date().getDay() === 0
    ? days[6]
    : days[new Date().getDay() - 1]
  const date = new Date().toLocaleDateString()

  return { day, date }
}

export default getDate