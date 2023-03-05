import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useNotes } from "./hooks/useNotes"
import Notes from './Notes'
import Home from "./Pages/Home"
import Login from './Pages/Login'
import NoteDetail from "./components/NoteDetail"
import Layout from "./components/Layout"
import SignUp from "./Pages/SignUp"
import { LogoutProvider } from "./context/logoutContext"

const App = () => {
  const { notes } = useNotes()

  return(
    <BrowserRouter>
      <LogoutProvider logout={false}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:id" element={<NoteDetail notes={notes}/>} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
          </Routes>
        </Layout>
      </LogoutProvider>
    </BrowserRouter>
  )
}

export default App