
import React, { useState } from 'react';

const ChatPage = () => {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayText(inputText);
    setInputText('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
      <p>{displayText}</p>
    </div>
  );
};

export default ChatPage;
