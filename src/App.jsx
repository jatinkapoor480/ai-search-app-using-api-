import { useState } from "react";
import './main.css'
import SearchBar from "./components/searchbar";
import Loader from "./components/loader";
import ResultCard from "./components/resultcard";

const GEMINI_API_KEY = "AIzaSyDyVeTHWE5_J1l4-hPblk2_ekj73yXcktY"; 
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;


function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(GEMINI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: query }],
            },
          ],
        }),
      });

      const data = await response.json();

      // ✅ Defensive check
      if (
        data?.candidates &&
        data.candidates[0]?.content?.parts &&
        data.candidates[0].content.parts[0]?.text
      ) {
        setResult(data.candidates[0].content.parts[0].text.trim());
      } else {
        setResult("❌ No valid response from Gemini API.");
        console.error("Unexpected API response format", data);
      }
    } catch (error) {
      console.error("Gemini API error:", error);
      setResult("❌ Error: Unable to fetch result.");
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div className="app">
      <h1 className="heading">AI Search (Gemini)</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {result && <ResultCard result={result} />}
    </div>
  );
}

export default App;

