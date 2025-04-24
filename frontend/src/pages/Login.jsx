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
    role: "employee", // default role
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email: form.email,
        password: form.password,
        userType: form.role,
      });

      const token = res.data.token;
      const user = res.data.user;

      dispatch(setCredentials({ user, token }));
      localStorage.setItem("token", token);
      toast.success("Login successful!");

      // Redirect based on role
      navigate('/Dashboard');

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

          {/* Role Selection */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Login as</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-lg bg-gray-100"
            >
              <option value="employee">Employee</option>
              <option value="company">Company (Admin)</option>
            </select>
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
