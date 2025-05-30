import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Allmovies.css";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;


const popularMovies = [
  "Inception",
  "The Dark Knight",
  "Interstellar",
  "Avengers: Endgame",
  "Titanic",
  "Joker",
  "The Shawshank Redemption",
  "The Godfather",
  "The Matrix",
  "Pulp Fiction",
  "Forrest Gump",
];

const popularShows = [
  "Game of Thrones",
  "Breaking Bad",
  "Stranger Things",
  "The Office",
  "Friends",
  "The Mandalorian",
  "The Witcher",
  "The Crown",
  "Peaky Blinders",
  "Money Heist",
];

const categoryTitles = {
  Action: ["Mad Max: Fury Road", "Gladiator", "Die Hard"],
  Comedy: ["The Hangover", "Superbad", "Step Brothers"],
  Romance: ["The Notebook", "Pride & Prejudice", "La La Land"],
  Horror: ["The Conjuring", "It", "A Quiet Place"],
  Drama: ["The Shawshank Redemption", "Forrest Gump", "The Godfather"],
  "Sci-Fi": ["Inception", "Interstellar", "The Matrix"],
};

const Allmovies = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showType, setShowType] = useState(null);
  const [category, setCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem("myList");
    return saved ? JSON.parse(saved) : [];
  });

  const location = useLocation();

  const fetchMovies = async () => {
    const results = [];
    let titles = [];

    console.log("Fetching movies...");

    if (showType === "shows") {
      titles = popularShows;
    } else if (showType === "mylist") {
      titles = myList.map((m) => m.Title);
    } else if (showType === "category" && category) {
      titles = categoryTitles[category] || [];
    } else {
      titles = popularMovies;
    }

    console.log("Titles to fetch:", titles);

    for (const title of titles) {
      console.log(`Fetching movie/show: ${title}`);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?t=${encodeURIComponent(
            title
          )}&apikey=${OMDB_API_KEY}`
        );
        const data = await res.json();
        if (data.Response === "True") {
          console.log(`Fetched data for: ${title}`);
          results.push(data);
        } else {
          console.log(`No data found for: ${title}`);
        }
      } catch (err) {
        console.error(`Error fetching ${title}:`, err);
      }
    }
    setMovies(results);
    console.log("Movies fetched:", results);
  };

  const searchMovie = async () => {
    if (!searchQuery.trim()) return;

    setErrorMessage("");
    console.log("Searching for movies with query:", searchQuery);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(
          searchQuery
        )}&apikey=${OMDB_API_KEY}`
      );
      const data = await res.json();

      console.log("Search API response:", data);

      if (data.Response === "True") {
        console.log("Search results found:", data.Search);
        const filtered = data.Search.filter((item) => {
          if (showType === "shows") return item.Type === "series";
          if (showType === "movies") return item.Type === "movie";
          return true;
        });

        if (filtered.length > 0) {
          setSearchResults(filtered);
        } else {
          setErrorMessage("No results available for this category.");
          setSearchResults([]);
        }
      } else {
        setErrorMessage("No related results found.");
        setSearchResults([]);
      }

      setSearchQuery("");
    } catch (err) {
      console.error("Error searching for movies:", err);
      setErrorMessage("Error fetching movie data.");
      setSearchResults([]);
    }
  };

  const fetchTrailer = async (movie) => {
    console.log(`Fetching trailer for: ${movie.Title}`);

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          movie.Title + " trailer"
        )}&key=${YOUTUBE_API_KEY}`
      );
      const data = await res.json();

      console.log("Trailer API response:", data);

      if (data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
        setSelectedMovie(movie);
        console.log(`Trailer found for: ${movie.Title}`);
      } else {
        setErrorMessage("Trailer not available on YouTube.");
        setTrailerUrl(null);
        console.log(`No trailer found for: ${movie.Title}`);
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
      setErrorMessage("Error fetching trailer.");
      setTrailerUrl(null);
    }
  };

  const handleAddToMyList = (movie) => {
    if (showType === "mylist") {
      const confirmRemove = window.confirm(
        `Do you want to remove "${movie.Title}" from your list?`
      );
      if (confirmRemove) {
        const updatedList = myList.filter((m) => m.imdbID !== movie.imdbID);
        setMyList(updatedList);
        localStorage.setItem("myList", JSON.stringify(updatedList));
        console.log(`Removed "${movie.Title}" from My List`);
      }
    } else {
      const confirmAdd = window.confirm(
        `Do you want to add "${movie.Title}" to your list?`
      );
      if (confirmAdd) {
        setMyList((prevList) => {
          const alreadyExists = prevList.some((m) => m.imdbID === movie.imdbID);
          const newList = alreadyExists ? prevList : [...prevList, movie];
          localStorage.setItem("myList", JSON.stringify(newList));
          console.log(`Added "${movie.Title}" to My List`);
          return newList;
        });
      }
    }
  };

  useEffect(() => {
    const stateType = location.state?.type;
    const selectedCategory = location.state?.category;

    if (
      stateType === "shows" ||
      stateType === "movies" ||
      stateType === "mylist"
    ) {
      setShowType(stateType);
      setCategory(null);
    } else if (stateType === "category" && selectedCategory) {
      setShowType("category");
      setCategory(selectedCategory);
    } else {
      setShowType("movies");
      setCategory(null);
    }
  }, [location]);

  useEffect(() => {
    if (showType) {
      fetchMovies();
    }
  }, [showType, category, myList]);

  return (
    <div className="p-4">
      {showType && (
        <>
          <h1 className="text-2xl font-bold mb-4">
            {showType === "shows"
              ? "Popular TV Shows (OMDb)"
              : showType === "mylist"
              ? "My List"
              : showType === "category"
              ? `${category} Movies`
              : "Popular Movies (OMDb)"}
          </h1>

          <div className="mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie or show..."
              className="border p-2 w-full"
            />
            <button
              onClick={searchMovie}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {searchResults.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Related Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {searchResults.map((movie) => (
                  <div
                    key={movie.imdbID}
                    className="border p-3 rounded shadow"
                    onDoubleClick={() => handleAddToMyList(movie)}
                  >
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="mb-2 w-full h-72 object-cover"
                    />
                    <h2 className="text-lg font-bold">{movie.Title}</h2>
                    <p>{movie.Year}</p>
                    <button
                      onClick={() => fetchTrailer(movie)}
                      className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Play Trailer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <h2 className="text-xl font-semibold mb-4">
            {showType === "shows"
              ? "TV Shows"
              : showType === "mylist"
              ? "Saved to My List"
              : showType === "category"
              ? `${category} Category`
              : "Movies"}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="border p-3 rounded shadow"
                onDoubleClick={() => handleAddToMyList(movie)}
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-72 object-cover"
                />
                <h2 className="text-lg font-semibold leading-tight mb-1">
                  {movie.Title}
                </h2>
                <p>{movie.Plot?.slice(0, 100)}...</p>
                <button
                  onClick={() => fetchTrailer(movie)}
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
                >
                  Play Trailer
                </button>
              </div>
            ))}
          </div>

          {trailerUrl && selectedMovie && (
            <div className="trailer-container mt-4">
              <h3 className="text-xl font-semibold">
                Trailer for {selectedMovie.Title}
              </h3>
              <iframe
                width="560"
                height="315"
                src={trailerUrl}
                frameBorder="0"
                allowFullScreen
                title="Movie Trailer"
              />
              <button
                onClick={() => setTrailerUrl(null)}
                className="mt-2 bg-gray-700 text-white px-3 py-1 rounded"
              >
                Close Trailer
              </button>
              <div className="mt-4">
                <p>
                  <strong>Title:</strong> {selectedMovie.Title}.{" "}
                  <strong>Year:</strong> {selectedMovie.Year}.{" "}
                  <strong>Released:</strong> {selectedMovie.Released}.{" "}
                  <strong>Runtime:</strong> {selectedMovie.Runtime}.
                </p>
                <p>
                  <strong>Genre:</strong> {selectedMovie.Genre}.{" "}
                  <strong>Actors:</strong> {selectedMovie.Actors}.{" "}
                  <strong>Language:</strong> {selectedMovie.Language}.{" "}
                  <strong>IMDb Rating:</strong> {selectedMovie.imdbRating}.{" "}
                  <strong>BoxOffice:</strong> {selectedMovie.BoxOffice}.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Allmovies;
