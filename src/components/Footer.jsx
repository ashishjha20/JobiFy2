import React from 'react';
import {FaFacebook} from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";



function Footer(){

    return(
        <div className='bg-[#197f62] h-[6vh] flex'>
            
            <div className='text-white py-2 px-4'>Follow us on </div>
            <div className='py-3.5 px-10 flex space-x-3 text-white'>
                <div><FaFacebook></FaFacebook></div>
                <div><FaInstagram /></div>
                <div><FaTwitter /></div>
                <div><FaLinkedin /></div>              
            </div>
          
            <div className='text-white py-2 px-96'>
                <p>2024 Jobify  | All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer;