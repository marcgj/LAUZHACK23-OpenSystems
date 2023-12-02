import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FileUpload() {
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(" ");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

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
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ base64: base64 }),
      })
        .then((res) => {
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
      class="block h-8 w-8 m-auto animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );

  return (
    <div className="flex flex-col h-screen ">
      <form
        className="m-auto text-center p-4 border-2 w-1/3"
        onSubmit={onSubmit}
      >
        {isUploading ? (
          spinner
        ) : (
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        )}

        <button
          type="submit"
          className="p-2 bg-sky-500 w-full m-1 rounded hover:bg-sky-600"
        >
          Upload File
        </button>
        <span className="text-red-500">{errorMsg}</span>
      </form>
    </div>
  );
}
