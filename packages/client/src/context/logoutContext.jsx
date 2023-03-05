import { createContext, useContext, useState } from "react";

const logoutContext = createContext()
const useLogout = () => useContext(logoutContext)

function LogoutProvider({ logout, children }) {
  const [ showLogout, setShowLogout ] = useState(logout)

  return (
    <logoutContext.Provider value={[ showLogout, setShowLogout ]}>
      {children}
    </logoutContext.Provider>
  )
}

export { LogoutProvider, useLogout }