import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Home_main from "../components/Home_main"

const Home =()=>{
    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
               <Home_main/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}
export default Home