import "./App.css";
import Chat from "./pages/chat";
import "./pages/fileUpload";
import FileUpload from "./pages/fileUpload";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App flex text-white backdrop-blur-md h-screen overscroll-none bg-gradient-to-br from-indigo-500 from-10% via-sky-700 via-30% to-emerald-700 to-90%">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<FileUpload />} />
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
