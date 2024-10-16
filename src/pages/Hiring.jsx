import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { EmailContext } from "../context/EmailContext";

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

    function ViewDetailsHandler(){
        // Navigate to 'jobdetails' page when button is clicked
        navigate("/view_details");
    }

    function DeleteHandler(jobId) {
        fetch(`${process.env.REACT_APP_BASE_URL}/deleteJob/${jobId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete job");
            }
            // // Optionally refresh the job list after deletion
            getAllData();
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    

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
            <div className="h-[87vh] w-[100vw] bg-gradient-to-b from-white to-[#c4f3d9]">
                <div className="container mx-auto p-4">
                    <h1 className="text-4xl font-bold text-center mb-8">Your Firm's Job Openings</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {empData.length > 0 ? (
                            empData
                                .filter(job => job.email === email)
                                .map((job, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow relative cursor-pointer"
                                        onMouseEnter={() => setHoveredJob(job)}
                                        onMouseLeave={() => setHoveredJob(null)}
                                        onClick={() => getInterestedCandidates(job)}
                                    >
                                        <h3 className="text-2xl font-semibold text-gray-800">{job.jobTitle}</h3>
                                        <p className="text-gray-600 mt-2">{job.description}</p>
                                        <p className="mt-4 font-medium text-gray-900">Company: {job.company}</p>
                                        <p className="mt-1 text-gray-700">Location: {job.location}</p>
                                        <p className="mt-1 text-gray-700">Salary: {job.salary || "Not specified"}</p>
                                        <p className="mt-1 text-gray-700">Work Type: {job.workType}</p>

                                        <button onClick={() => DeleteHandler(job._id)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
    Delete
</button>


                                        {hoveredJob === job && (
                                            <div className="absolute top-0 left-0 bg-gray-800 text-white p-2 rounded-lg mt-2 shadow-lg">
                                                <p>{job.requirements.join(', ') || "No specific requirements"}</p>
                                            </div>
                                        )}
                                    </div>
                                ))
                        ) : (
                            <p className="text-center col-span-full">Sorry, no openings at your firm.</p>
                        )}
                    </div>
                    <div className="text-center mt-8">
                        <button onClick={addJobHandler} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                            Add New Job
                        </button>
                    </div>
                </div>
            </div>

            {selectedJob && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full relative">
                        <button
                            onClick={() => setSelectedJob(null)} // Close the modal
                            className="absolute top-2 right-4 text-gray-700 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-3xl font-bold mb-6">{selectedJob.jobTitle} - Interested Candidates</h2>
                        {loadingCandidates ? (
                            <p>Loading interested candidates...</p>
                        ) : (
                            <ul>
                                <li>
    <p><strong>Company:</strong> {selectedJob.company}</p>
    <p><strong>Email:</strong> {interestedCandidates[firstKey][0].companyEmail || "N/A"}</p>
    <p><strong>Created Date:</strong> {new Date(interestedCandidates[firstKey][0].createdDate).toLocaleString()}</p>
    <p><strong>Job Title:</strong> {selectedJob.jobTitle}</p>
    <p><strong>Interested Candidate Emails:</strong></p>
    <ul className="list-disc ml-6 mt-2 space-y-4 max-h-60 overflow-y-scroll"> {/* Add scroll with fixed height */}
    {emails.map((email, idx) => (
        <div key={idx} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <li className="font-medium">{email}</li> {/* Email displayed above */}
            <div className="mt-4 flex space-x-3 justify-start"> {/* Buttons are now below the email */}
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out">
                    Hire
                </button>
                <button onClick={ViewDetailsHandler} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                    View Details
                </button>
            </div>
        </div>
    ))}
</ul>

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
