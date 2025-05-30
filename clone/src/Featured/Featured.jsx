import React, { useState, useEffect } from "react";
import "./Featured.css";

const YOUTUBE_API_KEY = "AIzaSyB9y_027QOS_H4bGAwS42zxMjtExYxO53s";
const OMDB_API_KEY = "2c4a30d9"; // Same OMDB API key as before

function Featured() {
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Select all elements to animate
    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

    // Intersection Observer options
    const observerOptions = {
      root: null, // Observe in the viewport
      threshold: 0.3, // Trigger when 30% of the element is visible
    };

    // Callback for the observer
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Add the visible class
        } else {
          entry.target.classList.remove("visible"); // Remove the visible class when out of view
        }
      });
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe each element
    elementsToAnimate.forEach((el) => observer.observe(el));

    // Cleanup observer on component unmount
    return () => {
      elementsToAnimate.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Fetch trailer URL and movie details on button click
  const fetchTrailer = async () => {
    const movieTitle = "Peaky Blinders"; // Example movie title

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          movieTitle + " trailer"
        )}&key=${YOUTUBE_API_KEY}`
      );
      const data = await res.json();

      if (data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);

        // Fetch movie details from OMDb API
        const movieRes = await fetch(
          `https://www.omdbapi.com/?t=${encodeURIComponent(
            movieTitle
          )}&apikey=${OMDB_API_KEY}`
        );
        const movieData = await movieRes.json();
        setSelectedMovie(movieData);
      } else {
        alert("Trailer not available on YouTube.");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
      alert("Error fetching trailer.");
    }
  };

  return (
    <div className="mainFeatured">
      <p className="f-p1 animate-on-scroll">Recent</p>
      <div className="Featured animate-on-scroll">
        <div className="FeturedImg animate-on-scroll">
          <video
            className="video"
            src="f203a78913795a783c95aa0733a53146.mp4"
            autoPlay
            loop
            muted
          ></video>
        </div>
        <div className="Featured-ply animate-on-scroll">Peaky Blinders</div>
        <p className="Featured-para animate-on-scroll">
          A notorious gang in 1919 Birmingham, England, is led by the fierce
          Tommy Shelby, a crime boss set on moving up in the world no matter the
          cost.
        </p>
        <button
          className="Featured-btn animate-on-scroll"
          onClick={fetchTrailer}
        >
          Play Now
        </button>
      </div>

      {/* Show trailer if available */}
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

          {/* Show movie details in two separate paragraphs */}
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
    </div>
  );
}

export default Featured;
