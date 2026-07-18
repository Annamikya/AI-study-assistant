import "./ChatPanel.css";
import { useState } from "react";

function ChatPanel() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      sender: "You",
      text: message,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <div className="chat-panel">

      <h2>AI Chat Assistant</h2>

      <div className="chat-box">

        {messages.length === 0 ? (
          <p className="empty-chat">
            Ask anything about your uploaded PDF...
          </p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="chat-message">
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))
        )}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Ask a question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatPanel;