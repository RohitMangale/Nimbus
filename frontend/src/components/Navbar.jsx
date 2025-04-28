import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../app/authSlice' // update the path
import { Button } from './Button'

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.location.href = '/login';
  }

  return (
    <div className="w-full h-[70px] flex flex-row bg-white items-center justify-between m-0 border-b-2 border-gray-100 px-3 basis-1">
      <Link to="/" className="text-indigo-600 font-bold text-3xl">Nimbus</Link>
      <div className="flex flex-row items-center gap-15 justify-around text-black text-[18px] pr-10">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/dashboard">Dashboard</Link>
        <div className="flex gap-2">
          {isAuthenticated && (
            <Button onClick={handleLogout}>Logout</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
