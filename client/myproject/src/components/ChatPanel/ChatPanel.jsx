import "./ChatPanel.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ChatPanel() {

  const { id } = useParams();

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendQuestion = async () => {

    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          pdfId: id,
          question,
        }
      );

      const aiMessage = {
        sender: "ai",
        text: res.data.chat.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (err) {

      console.log(err);

      alert("Unable to get AI response.");

    }

    setQuestion("");
    setLoading(false);

  };

  return (

    <div className="chat-panel">

      <h2>💬 Chat with PDF</h2>

      <div className="chat-box">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={msg.sender === "user" ? "user-msg" : "ai-msg"}
          >
            {msg.text}
          </div>

        ))}

        {loading && (
          <div className="ai-msg">
            Thinking...
          </div>
        )}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Ask anything from PDF..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={sendQuestion}>
          Send
        </button>

      </div>

    </div>

  );

}

export default ChatPanel;