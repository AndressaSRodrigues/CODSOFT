import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Shared/Navbar"
import Home from "./views/Home"
import CreateQuiz from "./views/CreateQuiz"
import BrowseQuizzes from "./views/BrowseQuizzes"
import Login from "./views/Login"
import CreateAccount from "./views/CreateAccount"
import Footer from "./components/Shared/Footer"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="create-quiz" element={<CreateQuiz />} />
        <Route path="browse-quizzes" element={<BrowseQuizzes />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
