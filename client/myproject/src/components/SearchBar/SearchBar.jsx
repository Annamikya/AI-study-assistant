import "./SearchBar.css";

function SearchBar({
  value,
  onChange,
  placeholder = "Search PDFs...",
}) {
  return (
    <div className="search-bar-wrapper">
      <span className="search-icon">⌕</span>

      <input
        type="text"
        className="search-box"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBar;