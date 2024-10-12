import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import logo from '../images/logo.png';
import { CgProfile } from "react-icons/cg";

const NavBar = () => {
  const navigate = useNavigate();

  // Function to navigate to the build profile page
  const handleBuildProfile = () => {
    navigate("/build-profile"); // Replace with your actual route for building profile
  };

  return (
    <div className="w-[100vw] h-[7vh] bg-white shadow-md">
      <div className="flex justify-between items-center px-10 py-3 relative">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Company Logo" loading="lazy" className="h-[10.5rem] absolute -top-14"></img>
        </div>
        
        {/* Build Profile Button */}
        <div className="ml-auto">
          <button
            onClick={handleBuildProfile}
            className="text-4xl p-0 hover:text-blue-500 transition-all"
            title="Build Profile" // Tooltip text
          >
            <CgProfile />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
