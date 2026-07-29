import "./Chat.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import ChatMessage from "../../components/ChatMessage/ChatMessage";

import { useState } from "react";
import axios from "axios";

function Chat() {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      message:
        "Hello! I'm your AI Study Assistant. Ask me anything.",
    },
  ]);

  const handleSend = async () => {

    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      message: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {

      const res = await axios.post(
        "https://ai-study-assistant-backend-9lrh.onrender.com/api/chat/general",
        {
          question,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: res.data.answer,
        },
      ]);

    } catch (err) {

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: "Unable to get AI response.",
        },
      ]);

    }

    setQuestion("");

  };

  return (
    <DashboardLayout>

      <div className="chat-page">

        <div className="chat-header">
          <h2>🤖 AI Study Assistant</h2>
          <p>Ask anything.</p>
        </div>

        <div className="chat-container">

          {messages.map((msg, index) => (

            <ChatMessage
              key={index}
              sender={msg.sender}
              message={msg.message}
            />

          ))}

        </div>

        <div className="chat-input-area">

          <input
            type="text"
            placeholder="Ask anything..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button onClick={handleSend}>
            Send
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Chat;