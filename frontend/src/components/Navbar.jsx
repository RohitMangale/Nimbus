import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="  w-full h-[70px] flex  flex-row bg-white items-center justify-between m-0 border-b-2 border-gray-100 px-3 basis-1 ">
        <Link to="./" className="  text-indigo-600 font-bold text-3xl ">Nimbus</Link>
        <div className=" flex  flex-row gap-15 justify-around text-black   text-[18px]  pr-10 ">

            <Link>About </Link>
            <Link>Contact </Link>
            <Link to="./dashboard" >Dashboard </Link>
        </div>
    </div>
  )
}

export default Navbar