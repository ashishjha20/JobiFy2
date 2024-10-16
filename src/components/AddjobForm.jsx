// src/components/AddjobForm.js
import React, { useState, useContext } from "react";
import { EmailContext } from "../context/EmailContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddjobForm = () => {
  const { email } = useContext(EmailContext);
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    salary: "",
    role: "",
    workType: "Full-time",
    description: "",
    requirements: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/addjobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to add job");
      }

      const result = await response.json();
      setSuccess("Job added successfully!");
      setError(null);

      // Redirect to /hiring after success
      navigate("/hiring");

    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <form
      className="max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-lg mt-8 space-y-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add a Job Listing</h2>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <div className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Work Type */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Work Type</label>
          <select
            name="workType"
            value={formData.workType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Temporary">Temporary</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
          ></textarea>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-1">
            Requirements (comma-separated)
          </label>
          <input
            type="text"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Submit Job
        </button>
      </div>
    </form>
  );
};

export default AddjobForm;
