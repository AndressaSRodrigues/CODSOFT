import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import CreateAccount from "./views/CreateAccount";
import JobDetails from "./views/JobDetails";
import Login from "./views/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="job/:id" element={<JobDetails />} />
      </Routes>
    </>
  )
}

export default App
