
import './App.css';

import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from "./pages/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from './pages/Register/Register';
import Upload from "./pages/Upload/Upload";
import Home from "./pages/Home/Home";
import PDFViewer from "./pages/PDFViewer/PDFViewer";
import MyPDFs from "./pages/MyPDFs/MyPDFs";
import Chat from "./pages/Chat/Chat";
import Summary from "./pages/Summary/Summary";
import Flashcards from "./pages/Flashcards/Flashcards";
import Quiz from "./pages/Quiz/Quiz";


function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/pdf-viewer" element={<PDFViewer />} />
      <Route path="/mypdfs" element={<MyPDFs />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/sidebar" element={<Sidebar />} />

    </Routes>
    

  );
}

export default App;


