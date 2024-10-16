import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home"
import { Routes, Route } from 'react-router-dom';
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Hiring from "./pages/Hiring"
import Seeking from './pages/Seeking'
import Addjob from './pages/Addjob';
import Build_profile from "./pages/Build_profile"
import ViewDetails from "./pages/ViewDetails"



function App() {
  return (
   <Routes>
    
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/hiring" element={<Hiring/>}/>
    <Route path="/seeking" element={<Seeking/>}/>
    <Route path="/addjob" element={<Addjob/>}/>
    <Route path="/build-profile" element={<Build_profile/>}/>
    <Route path="/view_details" element={<ViewDetails/>}/>
    

   </Routes>
  );
}

export default App;
