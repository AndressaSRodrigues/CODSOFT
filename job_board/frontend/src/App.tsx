import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthContext";
import theme from "./theme";
import Home from "./views/Home";
import CreateAccount from "./views/CreateAccount";
import JobDetails from "./views/JobDetails";
import Login from "./views/Login";
import DashboardPerson from "./views/DashboardPerson";
import DashboardCompany from "./views/DashboardCompany";
import EditJob from "./views/EditJob";
import UserProfile from "./views/UserProfile";
import AllJobs from "./views/AllJobs";
import Footer from "./components/Shared/Footer";
import Navbar from "./components/Shared/Navbar";

function App() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <>
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="profile/:id" element={<UserProfile />} />
            <Route path="dashboard/p" element={<DashboardPerson />} />
            <Route path="dashboard/c" element={<DashboardCompany />} />
            <Route path="jobs" element={<AllJobs />} />
            <Route path="job/:id" element={<JobDetails />} />
            <Route path="job/edit/:id" element={<EditJob />} />
          </Routes>
          <Footer />
        </>
      </ThemeProvider>
    </AuthProvider>
  )
};

export default App
