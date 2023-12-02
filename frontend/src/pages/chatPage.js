import React from "react";

export default function Chat() {
  return (
    <>
      <div className="w-2/3 m-auto">
        <div
          style={{ height: "70vh" }}
          className="flex flex-col my-auto bg-white/30 p-3 backdrop-blur-sm rounded-t overflow-scroll"
        >
          <div className="flex row items-center p-3 my-2  shadow-md max-w-lg rounded bg-black/70">
            <img
              src="user.png"
              className="inline aspect-square h-10 rounded-full bg-white/80 p-1 mx-2"
              alt=""
            />
            <span>
              La mamam de la ama de la mama de la mamaLa mamam de la ama de la
              mama de la mama La mamam de la ama de la mama de la mama
            </span>
          </div>
          <div className="flex flex-row-reverse place-self-end  shadow-md  items-center p-3 my-2 max-w-lg rounded bg-black/70">
            <img
              src="user.png"
              className="inline aspect-square h-10 rounded-full bg-white/80 p-1 mx-2"
              alt=""
            />
            <span>
              La mamam de la ama de la mama de la mamaLa mamam de la ama de la
              mama de la mama La mamam de la ama de la mama de la mama
            </span>
          </div>
        </div>
        <input
          type="text"
          className="p-3 w-full rounded-b"
          placeholder="Write your prompt"
          name=""
          id=""
        />
      </div>
    </>
  );
}