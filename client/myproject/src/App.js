
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
import Notes from "./pages/Notes/Notes";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import SelectQuizPDF from "./pages/SelectQuizPDF/SelectQuizPDF";
import SelectFlashcardPDF from "./pages/SelectFlashcardPDF/SelectFlashcardPDF";
import SelectNotesPDF from "./pages/SelectNotesPDF/SelectNotesPDF";



function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/pdf-viewer/:id" element={<PDFViewer />} />
      <Route path="/mypdfs" element={<MyPDFs />} />
      <Route path="/chat" element={<Chat />} />
     <Route
path="/summary/:id"
element={<Summary/>}
/>

      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      
      <Route
path="/select-quiz-pdf"
element={<SelectQuizPDF/>}
/>
    <Route
  path="/select-flashcard-pdf"
  element={<SelectFlashcardPDF />}
/>
    <Route
  path="/select-notes-pdf"
  element={<SelectNotesPDF />}
/>


    </Routes>
    
    

  );
}

export default App;


