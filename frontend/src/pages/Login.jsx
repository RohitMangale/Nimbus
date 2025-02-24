import { useState } from 'react';
import axios from "axios";
import illustration  from '../assets/imgs/loginIllustration.png'
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaKey, FaEye } from "react-icons/fa";

const Login = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
});

const [message, setMessage] = useState("");
const [token, setToken] = useState(null);

const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:5000/auth/login", form);
        setToken(res.data.token);
        setMessage("Login successful!");
        localStorage.setItem("token", res.data.token);
    } catch (err) {
        setMessage(err.response?.data?.error || "Login failed");
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

        {/* Social Login Buttons */}
        <div className="mt-6">
          <button className="flex items-center w-full p-3 border rounded-lg mb-3 hover:bg-gray-100">
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-3" />
            Login with Google
          </button>
          <button className="flex items-center w-full p-3 border rounded-lg hover:bg-gray-100">
            <img src="https://www.svgrepo.com/show/355061/facebook.svg" alt="Facebook" className="w-5 h-5 mr-3" />
            Login with Facebook
          </button>
        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Email</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
            <MdEmail  alt="Email" className="w-5 h-5 mr-3" />
            <input
              type="email" name="email"
              className="bg-transparent flex-1 outline-none"
              placeholder="Email" value={form.email} onChange={handleChange} required 

            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Password</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
            <FaKey className="w-5 h-5 mr-3" />
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

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center text-sm mb-4">
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
        <Link to='/signup' className="!important text-center  text-sm mt-4">
          Don’t have an account? <a href="#" className="text-purple-600 font-medium hover:underline">Sign Up</a>
        </Link>
      </form>
      </div>
    </div>
  );
};

export default Login;
