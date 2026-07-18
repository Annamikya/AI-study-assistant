import "./Chat.css";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import ChatMessage from "../../components/ChatMessage/ChatMessage";

function Chat() {
  return (
    <DashboardLayout>
      <div className="chat-page">

        <div className="chat-header">
          <h2>🤖 AI Study Assistant</h2>
          <p>Ask questions about your uploaded PDF.</p>
        </div>

        <div className="chat-container">

          <ChatMessage
            sender="ai"
            message="Hello! I'm your AI Study Assistant. Ask me anything about your uploaded PDF."
          />

          <ChatMessage
            sender="user"
            message="Explain React Hooks."
          />

          <ChatMessage
            sender="ai"
            message="React Hooks allow you to use state and lifecycle features in functional components."
          />

        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask something about your PDF..."
          />

          <button>Send</button>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default Chat;