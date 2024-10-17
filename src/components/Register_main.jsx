import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles

const Register_main = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const userRegister = async (data) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        await toast.success("Registration successful!", {
          position: "top-right", // Use string instead of toast.POSITION
          autoClose: 2000, // Auto close after 2 seconds
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error("Registration failed. Please try again.", {
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
      <form onSubmit={handleSubmit(userRegister)} className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Register</h2>
        
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: true })}
            className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-base"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: true })}
            className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-base"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true })}
            className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-base"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Role
          </label>
          <select
            id="role"
            {...register("role", { required: true })}
            className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-base"
          >
            <option value="">Select a role</option>
            <option value="Searcher">Searcher</option>
            <option value="Provider">Provider</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition duration-300 text-lg font-medium"
        >
          Register
        </button>
      </form>

      <ToastContainer /> {/* Add ToastContainer to render the toasts */}
    </div>
  );
};

export default Register_main;
