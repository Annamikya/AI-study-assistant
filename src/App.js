
import './App.css';


import Dashboard from "./pages/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from './pages/Register/Register';
import Upload from "./pages/Upload/Upload";
import Home from "./pages/Home/Home";


function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />

    </Routes>
    

  );
}

export default App;


