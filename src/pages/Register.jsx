import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Register_main from "../components/Register_main";

const Login=()=>{
    return(
        <div>
        <div>
            <NavBar/>
        </div>
        <div>
            <Register_main/>
        </div>
        <div>
            <Footer/>
        </div>
        </div>
    )
}
export default Login