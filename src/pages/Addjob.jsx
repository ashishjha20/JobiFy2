// src/pages/Addjob.js
import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import AddjobForm from "../components/AddjobForm"; // Import the form

const Addjob = () => {
    return (
        <div>
            <NavBar />
            <div className=" w-[100vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white from-40% to-[#c4f3d9] to-90%">
                <div className="container mx-auto p-4">
                    <AddjobForm /> {/* Add the job form here */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Addjob;
