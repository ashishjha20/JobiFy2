import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewDetails = () => {
    const { email } = useParams(); // Extract email from the URL
    const [candidateDetails, setCandidateDetails] = useState(null); // State for candidate details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch candidate details based on email
    useEffect(() => {
        const fetchCandidateDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getdetails/${email}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch candidate details");
                }

                const data = await response.json();
                setCandidateDetails(data); // Assuming your API response contains candidate details
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCandidateDetails();
    }, [email]);

    // Render loading state
    if (loading) {
        return <div>Loading candidate details...</div>;
    }

    // Render error state
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    // Render candidate details
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Candidate Details</h1>
            {candidateDetails ? (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p><strong>Name:</strong> {candidateDetails.name}</p>
                    <p><strong>Email:</strong> {candidateDetails.email}</p>

                    {/* Skills */}
                    <p><strong>Skills:</strong> {candidateDetails.skills.join(", ")}</p>

                    {/* Education */}
                    <h2 className="text-xl font-bold mt-4">Education</h2>
                    {candidateDetails.education && candidateDetails.education.length > 0 ? (
                        candidateDetails.education.map((edu, index) => (
                            <div key={edu._id || index}>
                                <p><strong>Institution:</strong> {edu.institution_name}</p>
                                <p><strong>Degree:</strong> {edu.degree}</p>
                                <p><strong>Field of Study:</strong> {edu.field_of_study}</p>
                                <p><strong>Years:</strong> {edu.start_year} - {edu.end_year}</p>
                            </div>
                        ))
                    ) : (
                        <p>No education details available.</p>
                    )}

                    {/* Work Experience */}
                    <h2 className="text-xl font-bold mt-4">Work Experience</h2>
                    {candidateDetails.work_experience && candidateDetails.work_experience.length > 0 ? (
                        candidateDetails.work_experience.map((work, index) => (
                            <div key={work._id || index}>
                                <p><strong>Job Title:</strong> {work.job_title}</p>
                                <p><strong>Company:</strong> {work.company}</p>
                                <p><strong>Years:</strong> {work.start_year} - {work.end_year}</p>
                                <p><strong>Description:</strong> {work.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No work experience details available.</p>
                    )}
                </div>
            ) : (
                <p>No candidate details available.</p>
            )}
        </div>
    );
};

export default ViewDetails;
