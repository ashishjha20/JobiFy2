
import React from "react";
import logo from '../images/logo.png';

const NavBar = () => {
  return (
    <div className=" w-[100vw] h-[7vh]">
      <div className="flex relative px-10 py-3 ">
        <img src={logo} alt="hello" loading="lazy" className="h-[10.5rem] absolute -top-14"></img>    
      </div>
    </div>
  );
};

export default NavBar;
