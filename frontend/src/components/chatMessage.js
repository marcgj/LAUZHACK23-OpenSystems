import React from "react";

export default function ChatMessage({ isUser, content }) {
  return (
    <div
      className={`flex ${
        isUser ? "flex-row-reverse place-self-end" : "row "
      } p-3 my-2 items-center  shadow-md max-w-lg rounded bg-black/70`}
    >
      <img
        src="user.png"
        className="inline aspect-square h-10 rounded-full bg-white/80 p-1 mx-2"
        alt=""
      />
      <span>{content}</span>
    </div>
  );
}
