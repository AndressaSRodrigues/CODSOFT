import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles'
import theme from "./theme";
import Home from "./views/Home";
import CreateAccount from "./views/CreateAccount";
import JobDetails from "./views/JobDetails";
import Login from "./views/Login";
import DashboardPerson from "./views/DashboardPerson";
import DashboardCompany from "./views/DashboardCompany";
import { AuthProvider } from "./context/AuthContext";
import EditJob from "./views/EditJob";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="dashboard/p" element={<DashboardPerson />} />
          <Route path="dashboard/c" element={<DashboardCompany />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="job/edit/:id" element={<EditJob />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>

  )
}

export default App
