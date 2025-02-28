// src/pages/Login.jsx
import { useState } from 'react';
import axios from "axios";
import illustration from '../assets/imgs/loginIllustration.png';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaKey, FaEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../app/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);
      const token = res.data.token;
      console.log(res.data);
      const user = res.data.user; // Extract user details from response
      dispatch(setCredentials({ user, token }));
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      navigate('/userDashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center h-full bg-gray-100">
      <div className="widthContainer flex min-h-screen gap-5 flex-row h-full items-center justify-between">
        <div className="max-w-md w-full">
          <img src={illustration} alt="Login Illustration" className="h-full w-full" />
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md min-w-[500px] max-w-[700px] w-full">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Welcome to <br /> <span className="text-purple-600 font-bold">Nimbus</span>
          </h2>

          {/* Social Login Buttons */}
          {/* <div className="mt-6">
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
          </div> */}

          {/* Email Input */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Email</label>
            <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
              <MdEmail className="w-5 h-5 mr-3" />
              <input
                type="email"
                name="email"
                className="bg-transparent flex-1 outline-none"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
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
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="bg-transparent flex-1 outline-none"
              />
              <button type="button">
                <FaEye className="w-5 h-5" />
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

          <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700">
            Login
          </button>
          <Link to='/signup' className="text-center text-sm mt-4 block">
            Don’t have an account? <span className="text-purple-600 font-medium hover:underline">Sign Up</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
