import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from 'react-router-dom';
import { login } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

export default function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const response = await authService.createAccount(data);
            if (response) {
                // Fetch user data after account creation
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <h2 className="text-center text-3xl font-semibold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">
                    {error}
                </p>}
                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="flex flex-col gap-8">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", { required: "Full name is required" })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your Email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address"
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter Password"
                            {...register("password", { required: "Password is required" })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
