import React from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";

// import "./Messages.css";

const Messages = ({ messages, name }) => (
  <div className="messages">
    {messages.map((message, i) => (
      <div key={i} className="message-box">
        <Message message={message} name={name} />
      </div>
    ))}
  </div>
);

export default Messages;
