import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { EmailContext } from "../context/EmailContext"; // Import the EmailContext

const Hiring = () => {
    const { email } = useContext(EmailContext); // Access email from EmailContext
    const [empData, setEmpData] = useState([]); // State for job data
    const [loading, setLoading] = useState(true); // Loading state for jobs
    const [error, setError] = useState(null); // Error state for jobs
    const [hoveredJob, setHoveredJob] = useState(null); // State for hovered job
    const [selectedJob, setSelectedJob] = useState(null); // State for selected job
    const [interestedCandidates, setCandidates] = useState({}); // State for interested candidates
    const [loadingCandidates, setLoadingCandidates] = useState(false); // Loading state for candidates
    const navigate = useNavigate(); 

    // Navigate to 'addjob' page when button is clicked
    const addJobHandler = () => {
        navigate("/addjob");
    };

    // Function to fetch all job data
    const getAllData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/alljobs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch jobs data");
            }

            const res = await response.json();
            setEmpData(res.data || []); // Assuming your API response has a 'data' field containing the jobs
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    // Function to fetch candidates interested in a specific job
    const getInterestedCandidates = async (job) => {
        setLoadingCandidates(true); // Set loading state for candidates
        setCandidates({}); // Reset candidates state
        setSelectedJob(job); // Set the selected job to display

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/candidates/${email}/${job.jobTitle}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch interested candidates");
            }

            const data = await response.json();
            setCandidates(data); // Assuming the structure matches
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingCandidates(false); // Reset loading state
        }
    };

    // Ensure we have candidates and extract the emails
    const firstKey = Object.keys(interestedCandidates)[0]; 
    let emails = [];

    if (firstKey && interestedCandidates[firstKey] && interestedCandidates[firstKey][0]) {
        emails = interestedCandidates[firstKey][0].interestedCandidateEmails || [];
    }

    // Fetch data when the component mounts
    useEffect(() => {
        getAllData();
    }, []);

    // Render loading state
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading jobs...</div>;
    }

    // Render error state
    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div>
            <NavBar />
            <div className="h-[87vh] w-[100vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white from-40% to-[#c4f3d9] to-90%">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold text-center mb-6">Your Firm's Job Openings</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {empData.length > 0 ? (
                            empData
                                .filter(job => job.email === email) // Filter jobs by user's email from context
                                .map((job, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative cursor-pointer"
                                        onMouseEnter={() => setHoveredJob(job)}
                                        onMouseLeave={() => setHoveredJob(null)}
                                        onClick={() => getInterestedCandidates(job)} // Fetch interested candidates on click
                                    >
                                        <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                                        <p className="text-gray-600">{job.description}</p>
                                        <p className="mt-2 font-medium text-gray-800">Company: {job.company}</p>
                                        <p className="mt-1">Location: {job.location}</p>
                                        <p className="mt-1">Salary: {job.salary || "Not specified"}</p>
                                        <p className="mt-1">Work Type: {job.workType}</p>

                                        {/* Tooltip for additional info */}
                                        {hoveredJob === job && (
                                            <div className="absolute top-0 left-0 bg-gray-800 text-white p-2 rounded-lg mt-2">
                                                <p>{job.requirements.join(', ') || "No specific requirements"}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                        ) : (
                            <p className="text-center col-span-full">Sorry, no openings at your firm.</p>
                        )}
                    </div>
                    {/* Add Job Button */}
                    <div className="text-center mt-6">
                        <button onClick={addJobHandler} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                            Add New Job
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal for displaying interested candidates */}
            {selectedJob && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
                        <button
                            onClick={() => setSelectedJob(null)} // Close the modal
                            className="absolute top-2 right-4 text-gray-700 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{selectedJob.jobTitle} - Interested Candidates</h2>
                        {loadingCandidates ? (
                            <p>Loading interested candidates...</p>
                        ) : (
                            <ul>
                                <li>
                                    <p><strong>Company:</strong> {selectedJob.company}</p>
                                    <p><strong>Email:</strong> {interestedCandidates[firstKey][0].companyEmail|| "N/A"}</p>
                                    <p><strong>Created Date:</strong> {new Date(interestedCandidates[firstKey][0].createdDate).toLocaleString()}</p>
                                    <p><strong>Job Title:</strong> {selectedJob.jobTitle}</p>
                                    <p><strong>Interested Candidate Emails:</strong> {emails.join(', ') || "None"}</p>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Hiring;
