import React, { useState } from "react";
import axios from "axios";
import illustration  from '../assets/imgs/loginIllustration.png'
import { Link } from "react-router-dom";
import { FaEye, FaIdCard, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const Signup = () => {
    const [form, setForm] = useState({
        emp_id: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        job_post: "",
        role: "user", // Default role
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/auth/signup", form);
            setMessage(res.data.message);
        } catch (err) {
            setMessage(err.response?.data?.error || "Signup failed");
        }
    };

    return (
    


    <div className=" flex justify-center h-full   bg-gray-100 ">
        <div className="widthContainer flex min-h-screen gap-5 flex-row h-full items-center justify-between ">

        <div className="max-w-md w-full ">
            <img src={illustration} alt="" className=' h-full w-full' />

        </div>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg  shadow-md h- min-w-[500px] max-w-[700px] w-[100%]">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Welcome to <br /> <span className="text-purple-600 font-bold">Nimbus</span>
        </h2>


        <div className="flex flex-row gap-4 flex-1  ">
               {/* First Name */}
               <div className="mb-4 flex-grow-1">
          <label className="text-gray-700 font-medium">First Name</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
            
            <input
              type="text" name="first_name"
              className="bg-transparent flex-1 outline-none"
              placeholder="First Name" value={form.first_name} onChange={handleChange} required 

            />
          </div>
            </div>        
        {/* Last Name */}
            <div className="mb-4 flex-grow-1">
          <label className="text-gray-700 font-medium">Last Name</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">

            <input
              type="text" name="last_name"
              className="bg-transparent flex-1 outline-none"
              placeholder="Last Name" value={form.last_name} onChange={handleChange} required 

            />
          </div>
            </div>
        </div>

  

        {/* Email Input */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Email</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
            {/* <MdEmail className="w-5 h-5 mr-3" /> */}
            <input
              type="email" name="email"
              className="bg-transparent flex-1 outline-none"
              placeholder="Email" value={form.email} onChange={handleChange} required 

            />
          </div>
        </div>
        {/* Emp ID */}
        <div className="mb-4 flex-grow-1">
          <label className="text-gray-700 font-medium">Employee ID</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
            {/* <FaIdCard className="w-5 h-5 mr-3" /> */}
            <input
              type="text" name="emp_id"
              className="bg-transparent flex-1 outline-none"
              placeholder="Employee ID" value={form.emp_id} onChange={handleChange} required 

            />
          </div>
        </div>  
 
        <div className="flex flex-row gap-4 flex-1  ">
        <div className="mb-4  flex-grow-1 ">
          <label className="text-gray-700 font-medium">Role</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">

            <input
              type="text" name="role"
              className="bg-transparent flex-1 outline-none"
              placeholder="role" value={form.role} onChange={handleChange} required 

            />
          </div>
        </div>
        <div className="mb-4  flex-grow-1 ">
          <label className="text-gray-700 font-medium">Employee Position</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">

            <input
              type="email" name="job_post"
              className="bg-transparent flex-1 outline-none"
              placeholder="Employee Position" value={form.job_post} onChange={handleChange} required 

            />
          </div>
        </div>
        </div>
        <div className="flex flex-row gap-4 flex-1  ">

        {/* Password Input */}
        <div className="mb-4 flex-grow-1">
          <label className="text-gray-700 font-medium">Password</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
            {/* <FaKey  className="w-5 h-5 mr-3" /> */}
            <input
              type="password"
              name="password"
              placeholder="Password" value={form.password} onChange={handleChange} required
              className="bg-transparent flex-1 outline-none"
            />
            <button>
              <FaEye alt="Show Password" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mb-4 flex-grow-1">
          <label className="text-gray-700 font-medium">Password</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
            {/* <FaKey className="w-5 h-5 mr-3" /> */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required
              className="bg-transparent flex-1 outline-none"
            />
            <button>
              <FaEye alt="Show Password" className="w-5 h-5" />
            </button>
          </div>
        </div>
        </div>
        {/* Remember Me & Forgot Password */}
        <div className="flex   justify-between items-center text-sm mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-purple-600 hover:underline">Forgot Password?</a>
        </div>

        {/* Login Button */}
        {message && <p className='w-auto p-2 font-bold  text-green-500  my-2 text-center  text-2xl '  >{message}</p>}
        <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700">
          Login
        </button>
            {/* {token && <p  className='w-auto p-2 font-bold  text-red-500  my-2 ' >Token: {token}</p>} */}
        {/* Register Link */}
        <Link to='/login' className="text-center text-sm mt-4">
          Don’t have an account? <a href="#" className="text-purple-600 font-medium hover:underline">Register</a>
        </Link>
      </form>
      </div>
    </div>
    
    
    );
};

export default Signup;
