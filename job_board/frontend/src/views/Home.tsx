
import DisplayJobCards from '../components/Jobs/DisplayJobCards';
import HomePage from '../components/HomePage';
import Navbar from '../components/Shared/Navbar';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

function Home() {

  const { token } = useAuth();

  useEffect(() => {
    console.log(token)
  })
  return (
    <>
      <Navbar />
      <HomePage />
      <DisplayJobCards />
    </>
  )
}

export default Home