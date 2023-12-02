import "./App.css";
import "./pages/fileUpload";
import FileUpload from "./pages/fileUpload";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
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
