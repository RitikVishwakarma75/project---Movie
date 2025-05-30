import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import "./More.css";

function More() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const container = document.querySelector(".More");
    const cards = container?.querySelectorAll(".card");

    const observerOptions = {
      root: null,
      threshold: 0.3,
    };

    const animateOnScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const movies = [
    {
      id: 1,
      name: "Batman",
      url: "https://cdn.prod.website-files.com/6009ec8cda7f305645c9d91b/66a4263d01a185d5ea22eeec_6408f6e7b5811271dc883aa8_batman-min.png",
      trailer: "https://www.youtube.com/embed/mqqft2x_Aa4", // Batman
    },
    {
      id: 2,
      name: "Dune 2",
      url: "https://cdn.shopify.com/s/files/1/0830/9575/files/dune-part-two-movie-poster-matt-ferguson_ac86f8c9-f410-450c-805b-c4352aac4a55_540x.jpg?v=1730814717",
      trailer: "https://www.youtube.com/embed/U2Qp5pL3ovA", // Dune 2
    },
    {
      id: 3,
      name: "Rogue One",
      url: "https://images-cdn.ubuy.co.in/63ef0a397f1d781bea0a2464-star-wars-rogue-one-movie-poster.jpg",
      trailer: "https://www.youtube.com/embed/frdj1zb9sMY", // Rogue One
    },
    {
      id: 4,
      name: "Avatar",
      url: "https://cdn.prod.website-files.com/6009ec8cda7f305645c9d91b/66a4263d01a185d5ea22eeef_6408f676b5811234c887ca62_top%2520gun%2520maverick-min.png",
      trailer: "https://www.youtube.com/embed/giXco2jaZ_4", // Top Gun Maverick
    },
  ];

  const openModal = (trailerUrl) => {
    setSelectedTrailer(trailerUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTrailer("");
    setShowModal(false);
  };

  return (
    <div className="More">
      <div className="moreMovie">
        <h1>More Movies</h1>
      </div>

      

      <div className="cardBox">
        {movies.map((movie) => (
          <div className="card" key={movie.id}>
            <div
              className="img1"
              style={{ backgroundImage: `url('${movie.url}')` }}
            ></div>
            <div className="movieName">{movie.name}</div>
            <div
              className="ply-btn"
              onClick={() => openModal(movie.trailer)}
              style={{ cursor: "pointer" }}
            >
              Play
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              position: "relative",
              width: "80%",
              maxWidth: "800px",
              aspectRatio: "16 / 9",
              background: "#000",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src={selectedTrailer}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "#fff",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>
        </div>
      )}
      {/* Button to navigate to All Movies page */}
      <button className="viewAllMoviesBtn"
        onClick={() => navigate("/all-movies")}
        
      >
        View All Movies
      </button>
    </div>
    
  );
}









export default More;
