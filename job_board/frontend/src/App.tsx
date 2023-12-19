import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import CreateAccount from "./views/CreateAccount";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create-account" element={<CreateAccount />} />
      </Routes>
    </>
  )
}

export default App
