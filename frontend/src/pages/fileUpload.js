import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FileUpload() {
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(" ");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    if (!file) {
      setErrorMsg("No file selected!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];

      setIsUploading(true);
      fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: JSON.stringify({ base64: base64 }),
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            navigate("chat");
          }
        })
        .catch((err) => {
          setIsUploading(false);
          setErrorMsg("Error while uploading file");
        });
    };
  }

  const spinner = (
    <div
      className="block h-8 w-8 m-auto animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );

  return (
    <form
      className="m-auto bg-white/30 backdrop-blur-sm text-center p-4 rounded w-1/3 shadow-md"
      onSubmit={onSubmit}
    >
      {isUploading ? (
        spinner
      ) : (
        <label htmlFor="upload">
          <div className="m-auto border-dashed   flex flex-col justify-items-center border-2 rounded py-8  hover:cursor-pointer">
            <small className="">{file ? file.name : "Select file"}</small>
          </div>
          <input
            type="file"
            id="upload"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
      )}

      <button
        type="submit"
        className="p-2 mb-2 m-auto mt-3 mt shadow-sm bg-green-600/90 backdrop-blur-sm w-full rounded hover:bg-green-700/90"
      >
        Upload File
      </button>
      <span className="text-red-500 drop-shadow-sm ">{errorMsg}</span>
    </form>
  );
}
