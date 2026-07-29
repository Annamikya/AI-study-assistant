import "./NoteCard.css";

function NoteCard({ title, content }) {
  return (
    <div className="note-card">
      <h3>{title}</h3>

      <p>{content}</p>

      <div className="note-buttons">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;