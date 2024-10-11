import React from 'react';
import person from "../images/person.png";
import { useNavigate } from 'react-router-dom';


import './Home_main.css';


function Hero() {
    const navigate = useNavigate();

    function RegisterHandler() {
        
        navigate('/register');
    }

    function LoginHandler() {
        
        navigate('/login');
    }
    
    
    

    return (
        <div className='h-[87vh] w-[100vw] flex row justify-between bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white from-40% to-[#c4f3d9] to-90%'>
            <div className='px-20 py-20 flex-col'>
                <h2 className="temp">INDIA's #1 JOB PLATFORM</h2>
                <h1 className="temp2">Your <span className='jb'>Job</span> search ends here</h1>
                <p className='temp3'>Discover 50 lakh+ career opportunities</p>

                <div className='btn-container'>
                    <button onClick={RegisterHandler} className='btn'>Register</button>
                    <button onClick={LoginHandler} className='btn'>Login</button>
                </div>
            </div>

            <div>
                <img src={person} className='image' alt="Person" />
            </div>
        </div>
    );
}

export default Hero;