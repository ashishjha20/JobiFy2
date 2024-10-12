import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import { EmailContext } from "../context/EmailContext";

const Hiring = () => {
  const { email } = useContext(EmailContext); // Access email context
  const [empData, setEmpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredJob, setHoveredJob] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [message, setMessage] = useState(""); // State for messages (success/error)
  const navigate = useNavigate();

  // Function to fetch all job data
  const getAllData = async () => {
    try {
      const getPeople = await fetch(`${process.env.REACT_APP_BASE_URL}/alljobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!getPeople.ok) {
        throw new Error("Failed to fetch jobs data");
      }

      const res = await getPeople.json();
      setEmpData(res.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData(); // Fetch data when the component mounts
  }, []);

  const handleApply = async (job) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/updateInterest`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: job.company,
          title: job.jobTitle,
          interestedEmail: email, // Send the interested candidate's email
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update interested candidates");
      }

      const data = await response.json();
      setMessage(data.message || "Successfully applied!"); // Show success message
    } catch (error) {
      setMessage(error.message); // Show error message
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div>
      <NavBar1 />
      <div className="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white from-40% to-[#c4f3d9] to-90%">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Available Jobs</h1>

          {/* Job Listings Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {empData.length > 0 ? (
              empData.map((job, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
                  onMouseEnter={() => setHoveredJob(job)}
                  onMouseLeave={() => setHoveredJob(null)}
                >
                  <h3 className="text-2xl font-semibold text-blue-600 mb-2">{job.jobTitle}</h3>
                  <p className="text-gray-700 mb-2">{job.company}</p>
                  <p className="text-gray-500 mb-4">{job.location}</p>
                  <p className="text-gray-600 font-semibold mb-2">Salary: {job.salary || "Not specified"}</p>
                  
                  {/* Separate Buttons for View Details and Apply */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleApply(job)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                      Apply Now
                    </button>
                  </div>

                  {/* Additional Information for Hovered Job */}
                  {hoveredJob === job && (
                    <div className="absolute top-0 left-0 bg-gray-800 text-white p-2 rounded-lg mt-2 w-full">
                      <p>{job.requirements.join(", ") || "No specific requirements"}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">No jobs available at the moment.</p>
            )}
          </div>

          {/* Expanded Job Details (Modal or Inline Section) */}
          {selectedJob && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-2 right-4 text-gray-700 text-2xl"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">{selectedJob.jobTitle}</h2>
                <p className="text-lg mb-2">Company: {selectedJob.company}</p>
                <p className="text-gray-600 mb-4">Location: {selectedJob.location}</p>
                <p className="font-semibold mb-2">Salary: {selectedJob.salary || "Not specified"}</p>
                <p className="mb-2">Work Type: {selectedJob.workType}</p>
                <p className="mb-4">Requirements: {selectedJob.requirements.join(", ")}</p>

               
              </div>
            </div>
          )}

          {/* Message Section */}
          {message && (
            <div className="text-center mt-4">
              <p className="text-green-500">{message}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hiring;
