import React, { useEffect, useState } from "react";
import ChatMessage from "../components/chatMessage";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();

  function buildMessage(isUser, content) {
    return { isUser: isUser, content: content };
  }

  function handleMessage() {
    if (!message) return;

    const temp = [];
    temp.push(buildMessage(true, message));
    setMessages(messages.concat(temp));
    fetch("http://127.0.0.1:5000/get_response", {
      method: "POST",
      body: message,
      mode: "cors",
    })
      .then((res) => res.text())
      .then((msg) => {
        console.log(msg);
        temp.push(buildMessage(false, msg));
        setMessages(messages.concat(temp));
      });

    setMessage("");
  }

  return (
    <>
      <div className="w-2/3 m-auto">
        <div
          style={{ height: "70vh" }}
          className="flex flex-col my-auto bg-white/30 p-3 backdrop-blur-sm rounded-t overflow-scroll"
        >
          {messages.map(({ isUser, content }) => (
            <ChatMessage isUser={isUser} content={content} />
          ))}
        </div>
        <input
          type="text"
          className="p-3 w-full rounded-b text-black"
          placeholder="Write your prompt"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleMessage();
          }}
        />
      </div>
    </>
  );
}
