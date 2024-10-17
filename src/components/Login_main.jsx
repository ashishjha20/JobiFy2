import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EmailContext } from "../context/EmailContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles

const Login_main = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setEmail } = useContext(EmailContext);

  const userLogin = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const result = await response.json();
        setEmail(data.email); // Store email in context
        toast.success("Login successful!", {
          position: "top-right", // Use string instead of toast.POSITION
          autoClose: 2000,
        });
        navigate("/dashboard");
      } else {
        toast.error("Login failed. Please check your credentials.", {
          position: "top-right", // Use string instead of toast.POSITION
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        position: "top-right", // Use string instead of toast.POSITION
        autoClose: 3000,
      });
    }
  };
  

  return (
    <div className="flex items-center justify-center h-[87vh] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white from-40% to-[#c4f3d9] to-90%">
      <form onSubmit={handleSubmit(userLogin)} className="bg-white p-12 rounded-lg shadow-xl max-w-lg w-full min-h-[450px]">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">Login</h2>
        
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="mt-1 block w-full p-4 rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-base"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true })}
            className="mt-1 block w-full p-4 rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-base"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition duration-300 text-lg font-medium"
        >
          Login
        </button>
      </form>

      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
    </div>
  );
};

export default Login_main;
