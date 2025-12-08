import React from "react";

const Login = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex justify-center  min-h-screen ">
      <div className="flex flex-col lg:flex-row w-full  shadow-xl bg-white dark:bg-gray-800  overflow-hidden">

        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 justify-center items-center relative p-10">

          {/* Glow Circles */}
          <div className="absolute w-72 h-72 bg-white/20 rounded-full blur-3xl -top-10 -left-10"></div>
          <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl bottom-10 right-10"></div>

          <div className="relative z-10 text-center text-white px-8">
            <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>

            <h1 className="text-4xl font-bold mt-6 drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="text-white/80 mt-3 text-lg font-light leading-relaxed">
              Verileriniz %100 güvende.  
              En son güvenlik protokolleriyle korunuyorsunuz.
            </p>

            {/* Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              <div className="w-3 h-3 rounded-full bg-white/40"></div>
              <div className="w-3 h-3 rounded-full bg-white"></div>
              <div className="w-3 h-3 rounded-full bg-white/40"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-14">
          <div className="flex ">
          <div className="w-full  max-w-md">

<h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center lg:text-left mb-6">
  Login To Your Account
</h2>

<form className="space-y-5">
  {/* Email */}
  <div>
    <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Email
    </label>
    <input
      type="email"
      id="email"
      className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="example@mail.com"
    />
  </div>

  {/* Password */}
  <div>
    <label
      htmlFor="password"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Password
    </label>
    <input
      type="password"
      id="password"
      className="mt-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="••••••••"
    />
  </div>

  {/* Remember me + forgot */}
  <div className="flex items-center justify-between">
    <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
      <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
      <span className="text-sm">Remember Me</span>
    </label>

    <a className="text-sm text-blue-600 hover:underline" href="#">
      Forgot Password?
    </a>
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition transform hover:-translate-y-0.5"
  >
    Log In
  </button>
</form>

{/* Divider */}
<div className="mt-8 relative">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
  </div>
  <div className="relative flex justify-center text-sm">
    <span className="px-3 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400">
      Other Options
    </span>
  </div>
</div>

{/* Social Login */}
<div className="mt-6 grid grid-cols-2 gap-3">
  <button className="py-3 flex justify-center items-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
    <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373..." />
    </svg>
    <span className="ml-2 text-gray-700 dark:text-gray-300">Facebook</span>
  </button>

  <button className="py-3 flex justify-center items-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.48 10.92..." />
    </svg>
    <span className="ml-2 text-gray-700 dark:text-gray-300">Google</span>
  </button>
</div>

</div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Login;
