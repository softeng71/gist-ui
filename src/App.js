import React, { useState } from "react";

import './App.css';
import './components/Search';
import Search from "./components/Search";
import FavoriteGistsButton from './components/FavoriteGistsButton';
import SearchResults from "./components/SearchResults";

function App() {
    const [showResults, setShowResults] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFavorites, setIsFavorites] = useState(false);

    function showSearchResults(message, isFavorites) {
        hideSearchResults();
        setShowResults(true);
        setSearchQuery(message);
        setIsFavorites(isFavorites);
    }

    function hideSearchResults() {
        setShowResults(false);
        setSearchQuery("");
        setIsFavorites(false);
    }


    return (
    <div className="App">
      <header className="App-header">
        <Search triggerShowSearchResults={showSearchResults} />
        <FavoriteGistsButton triggerShowSearchResults={showSearchResults} />
      </header>
        {showResults ? <SearchResults searchQuery={searchQuery} favs={isFavorites} /> : ""}
    </div>
  );
}

export default App;
