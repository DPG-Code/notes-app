import { Link } from "react-router-dom"
import { useLogout } from "../context/logoutContext"
import { useUser } from '../hooks/useUser'

export default function Layout({ children }) {
  const { user } = useUser()
  const [ showLogout, setShowLogout ] = useLogout()

  const changeLogout = () => {
    setShowLogout(showLogout === false ? true : false)
  }

  return (
    <main>
      <header className="FontThin w-full h-16 px-6 flex items-center justify-between absolute top-0   sm:px-24   xl:h-24   2xl:px-36">
        <Link to="/" className="header-link mr-4 text-base border-b-2 text-[#F2F2F2] border-transparent hover:border-[#F2F2F2]   sm:text-lg   lg:mr-12   xl:mr-16 xl:text-3xl">Home</Link>
        <Link to="/notes" className="header-link mr-auto text-base border-b-2 text-[#F2F2F2] border-transparent hover:border-[#F2F2F2]   sm:text-lg   xl:text-3xl">Notes</Link>
        
        <Link to="/" className="header-button mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F2F2F2" className="w-6 h-6">
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </Link>
        <Link to="/notes" className="header-button mr-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F2F2F2" className="w-6 h-6">
            <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z" clipRule="evenodd" />
          </svg>
        </Link>

        {
          user
          ? <button
              onClick={changeLogout}
              className="FontLight border-2 border-[#F2F2F2] text-xs text-[#F2F2F2] px-6 py-1 rounded-2xl flex items-center justify-center gap-2   sm:text-sm   xl:px-10 xl:py-2 xl:text-2xl xl:rounded-3xl"
            >
              {user.username}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F2F2F2" className="w-4 h-4   xl:w-5 xl:h-5">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
              </svg>
            </button>
          : <div className="flex gap-2 items-center   lg:gap-6   xl:gap-8">
              <Link
                to="/signup"
                className="FontRegular bg-[#F2F2F2] text-[#1D1C21] border-2 border-[#F2F2F2] rounded-2xl text-xs px-3 py-1 text-center   sm:px-6 sm:text-sm   xl:px-10 xl:py-2 xl:text-2xl xl:rounded-3xl"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="FontRegular text-[#F2F2F2] border-2 border-[#F2F2F2] hover:bg-[#F2F2F2] hover:text-[#1D1C21] rounded-2xl text-xs px-3 py-1 text-center   sm:px-6 sm:text-sm   xl:px-10 xl:py-2 xl:text-2xl xl:rounded-3xl"
              >
                Login
              </Link>
          </div> 
        }
      </header>
      {children}
      <div className='circle'></div>
      <div className='circle2'></div>
    </main>
  )
}