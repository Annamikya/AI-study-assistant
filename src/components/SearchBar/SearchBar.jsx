import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="searchbar-container">
      <FaSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search PDFs, Notes, Flashcards..."
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;