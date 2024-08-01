import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "./index.js";
import { useDispatch} from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from 'react-hook-form';
import PasswordResetPopup from "./PasswordResetPopup"; // Import the popup component

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [showResetPopup, setShowResetPopup] = useState(false); // State to control popup visibility

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      console.log("in login session",session)
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log("in login",userData)
        if (userData) dispatch(authLogin(userData));
        navigate("/all-posts");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <h2 className="text-center text-3xl font-semibold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link 
            to="/signup"
            className="font-medium transition-all duration-200 hover:underline"
          >
            Signup
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="flex flex-col gap-8">
            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 
                  "Email address must be a valid address"
                }
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter Password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">Sign In</Button>
          </div>
        </form>
        <p className="text-center mt-4">
          <button 
            onClick={() => setShowResetPopup(true)}
            className="text-blue-500 hover:underline"
          >
            Forgot Password? Reset Password
          </button>
        </p>
      </div>

      {/* Render the PasswordResetPopup if showResetPopup is true */}
      {showResetPopup && <PasswordResetPopup onClose={() => setShowResetPopup(false)} />}
    </div>
  );
}

export default Login;
