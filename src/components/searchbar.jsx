import { useState } from 'react';
import './searchbar.css'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reload
    if (query.trim()) onSearch(query);
    setQuery(""); 
  };

  return (
    <form onSubmit={handleSubmit}> 
      <input
        className='searchbar'
        type="text"
        placeholder="Ask something..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className='submit' type="submit">Search</button>
    </form>
  );
}
