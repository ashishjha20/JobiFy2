import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Login_main from "../components/Login_main";

const Login=()=>{
    return(
        <div>
        <div>
            <NavBar/>
        </div>
        <div>
            <Login_main/>
        </div>
        <div>
            <Footer/>
        </div>
        </div>
    )
}
export default Login