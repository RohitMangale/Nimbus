import React, { useState } from "react";
import axios from "axios";
import illustration from "../assets/imgs/loginIllustration.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cin: "",
    registration_date: "",
    roc_location: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Frontend-only password match check
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
  
    const formData = {
      name: form.name,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      cin: form.cin,
      registration_date: form.registration_date,
      roc_location: form.roc_location,
    };
  
    try {
      const res = await axios.post("http://localhost:5000/auth/signup", formData);
      setMessage(res.data.message);
  
      if (res.data.message === "Company registered successfully!") {
        setForm({
          name: "",
          cin: "",
          registration_date: "",
          roc_location: "",
          email: "",
          password: "",
          confirmPassword: "", // Reset frontend-only field too
        });
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err.response);
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };
  
  return (
    <div className="flex justify-center h-full bg-gray-100">
      <div className="widthContainer flex min-h-screen gap-5 flex-row items-center justify-between">
        <div className="max-w-md w-full">
          <img src={illustration} alt="" className="h-full w-full" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md min-w-[500px] max-w-[700px] w-full"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Register your <br />{" "}
            <span className="text-purple-600 font-bold">Company</span>
          </h2>

          {/* Company Name */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Company Name</label>
            <input
              type="text"
              name="name"
              className="bg-gray-100 p-2 w-full rounded-lg mt-1 outline-none"
              placeholder="Enter company name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* CIN and Registration Date */}
          <div className="flex flex-row gap-4 flex-1">
            {/* CIN Input */}
            <div className="mb-4 flex-grow-1">
              <label className="text-gray-700 font-medium">
                Company Identification Number (CIN)
              </label>
              <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
                <input
                  type="text"
                  name="cin"
                  maxLength={21}
                  pattern="[A-Za-z0-9]{1,21}"
                  title="CIN must be alphanumeric and up to 21 characters"
                  className="bg-transparent flex-1 outline-none"
                  placeholder="CIN (e.g. U12345MH2025PTC000000)"
                  value={form.cin}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Registration Date */}
            <div className="mb-4">
              <label className="text-gray-700 font-medium">
                Registration Date
              </label>
              <input
                type="date"
                name="registration_date"
                className="bg-gray-100 p-2 w-full rounded-lg mt-1 outline-none"
                value={form.registration_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ROC Location */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium">ROC Location</label>
            <input
              type="text"
              name="roc_location"
              className="bg-gray-100 p-2 w-full rounded-lg mt-1 outline-none"
              placeholder="Enter ROC location"
              value={form.roc_location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="bg-gray-100 p-2 w-full rounded-lg mt-1 outline-none"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Password and Confirm Password */}
          <div className="flex flex-row gap-4 flex-1">
            {/* Password */}
            <div className="mb-4 flex-grow-1">
              <label className="text-gray-700 font-medium">Password</label>
              <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="bg-transparent flex-1 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye className="w-5 h-5 cursor-pointer" />
                  ) : (
                    <FaEyeSlash className="w-5 h-5 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4 flex-grow-1">
              <label className="text-gray-700 font-medium">
                Confirm Password
              </label>
              <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="bg-transparent flex-1 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEye className="w-5 h-5 cursor-pointer" />
                  ) : (
                    <FaEyeSlash className="w-5 h-5 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {message && (
            <p className="w-auto p-2 font-bold text-green-500 my-2 text-center text-2xl">
              {message}
            </p>
          )}
          <button
            type="submit"
            className="w-full cursor-pointer bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
          >
            Sign Up
          </button>

          <Link to="/login" className="text-center text-sm mt-4 block">
            Already have an account?{" "}
            <span className="text-purple-600 font-medium hover:underline">
              Login
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
