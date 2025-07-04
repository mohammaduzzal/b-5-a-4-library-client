import { Outlet } from 'react-router'
import './App.css'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'


function App() {
 

  return (
    <>
    <Navbar/>
    <div className='min-h-[calc(100vh-117px)] w-11/12 mx-auto'>
      <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default App
