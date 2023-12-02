import "./App.css";
import "./pages/fileUpload";
import FileUpload from "./pages/fileUpload";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App backdrop-blur-md bg-gradient-to-br from-indigo-500 from-10% via-sky-700 via-30% to-emerald-700 to-90%">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<FileUpload />} />
          <Route path="/chat" element={"WIP"}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
