import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();

    function HiringHandler() {
        
        navigate('/hiring');
    }

    function SeekerHandler() {
        
        navigate('/seeking');
    }

  return (
   

    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1 items-center justify-center">
        <div className="flex items-center justify-center h-[87vh] w-[100vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white from-40% to-[#c4f3d9] to-90%">
          <div className="space-x-6">
            <button onClick={SeekerHandler} className="bg-blue-500 text-white py-4 px-10 rounded-full text-xl hover:bg-blue-600 transition duration-300">
              Career Seeker
            </button>
            <button onClick={HiringHandler} className="bg-green-500 text-white py-4 px-10 rounded-full text-xl hover:bg-green-600 transition duration-300">
              Hiring Partner
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
