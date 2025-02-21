import illustration  from '../assets/imgs/loginIllustration.png'

const Login = () => {
  return (
    <div className=" flex justify-center h-full   bg-gray-100 ">
        <div className="widthContainer flex min-h-screen gap-5 flex-row h-full items-center justify-between ">

        <div className="max-w-md w-full ">
            <img src={illustration} alt="" className=' h-full w-full' />

        </div>
      <div className="bg-white p-8 rounded-lg  shadow-md h- min-w-[500px] max-w-[700px] w-[100%]">
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
            <img src="https://www.svgrepo.com/show/349384/email.svg" alt="Email" className="w-5 h-5 mr-3" />
            <input
              type="email"
              placeholder="example@gmail.com"
              className="bg-transparent flex-1 outline-none"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium">Password</label>
          <div className="flex items-center bg-gray-100 p-2 rounded-lg mt-1">
            <img src="https://www.svgrepo.com/show/349357/lock.svg" alt="Password" className="w-5 h-5 mr-3" />
            <input
              type="password"
              placeholder="********"
              className="bg-transparent flex-1 outline-none"
            />
            <button>
              <img src="https://www.svgrepo.com/show/349433/eye.svg" alt="Show Password" className="w-5 h-5" />
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
        <button className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700">
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account? <a href="#" className="text-purple-600 font-medium hover:underline">Register</a>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Login;
