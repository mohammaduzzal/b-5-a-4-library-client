import { NavLink } from "react-router"
import { ModeToggle } from "../mode-toggle"

export default function Navbar() {

    const links = <>
    <li><NavLink className={({isActive})=> (isActive ? "text-green-400" : "")} to='/'>All Books</NavLink></li>
    <li><NavLink className={({isActive})=> (isActive ? "text-green-400" : "")} to='/addBook'>Add Book</NavLink></li>
    <li><NavLink className={({isActive})=> (isActive ? "text-green-400" : "")} to='/borrow'>Borrow Summary</NavLink></li>
    </>


  return (
   <div className="w-11/12 mx-auto">
  <div className="navbar-start">
    <NavLink to='/' className="text-green-400 hidden md:block"><strong>Book</strong>Heaven</NavLink>
      <div className="dropdown">
      <div tabIndex={0} role="button" className="lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content  rounded-box z-1  shadow">
       {links}
       
      </ul>
    </div>
    
  </div>
  
  <div className="navbar-end">
    <ModeToggle/>
    <div className="hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {links}
    </ul>
  </div>

  </div>
  
</div>
  )
}
