// Importing necessary components and assets
import Content from "./Content";
import Heading from "./Heading";
import searchImg from "./assets/search.png";
import { useState } from "react";

function App() {
  // State for the word to search and the search results
  const [word, setWord] = useState("");
  const [results, setResults] = useState(null);

  // Function to fetch word data from the dictionary API
  const searchWord = async () => {
    const response = await fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
    );
    
    const data = await response.json();
    setResults(data[0]);
  };

  // Function to extract heading information from the results
  const heading = () => {
    const audio = results?.phonetics.find((phone) => phone.audio !== "")?.audio;
    return {
      audioUrl: audio,
      word: results?.word,
      phonetic: results?.phonetic,
    };
  };

  return (
    <div className="container mx-auto px-10">
      {/* Navigation bar */}
      <nav className="my-2 h-14 flex flex-row items-center">
        <h2 className="text-indigo-600 font-bold text-2xl">Ordbok</h2>
      </nav>

      {/* Search input field */}
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="w-full bg-gray-100 border-none outline-none rounded-lg px-3 py-4 shadow-sm"
      />

      {/* Search button */}
      <button className="-mx-14 px-3 py-4 rounded-lg" onClick={searchWord}>
        <img src={searchImg} width={18} />
      </button>

      {/* Display results if available */}
      {results?.meanings?.length > 0 && (
        <>
          <Heading {...heading()} />
          {results.meanings.map((content, index) => {
            return <Content {...content} key={index} />;
          })}
        </>
      )}
    </div>
  );
}

export default App;
