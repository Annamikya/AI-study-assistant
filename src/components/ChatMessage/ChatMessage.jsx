import "./ChatMessage.css";

function ChatMessage({ sender, message }) {
  return (
    <div
      className={
        sender === "user"
          ? "chat-message user-message"
          : "chat-message ai-message"
      }
    >
      <div className="message-header">
        <span className="sender">
          {sender === "user" ? "🧑 You" : "🤖 StudyAI"}
        </span>
      </div>

      <div className="message-body">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ChatMessage;