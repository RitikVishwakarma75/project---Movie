import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleAvatarClick = () => {
    navigate("/login");
  };

  const handleCategoryClick = (category) => {
    navigate("/all-movies", { state: { type: "category", category } });
    setShowCategoryDropdown(false);
  };

  return (
    <div className={`header ${show ? "header__black" : ""}`}>
      <div className="header__contents">
        <img
          className={`header__logo ${show ? "animate-logo" : ""}`}
          src="https://i.pinimg.com/736x/ea/96/15/ea9615abd029c0a203c07394f291c344.jpg"
          alt="Netflix Logo"
          onClick={() => {
            navigate("/");
            window.location.reload();
          }} // ← this line refreshes the page
        />
        <div
          className={`header__nav ${show ? "animate-nav" : ""} ${
            menuOpen ? "open" : ""
          }`}
        >
          <button className="header__option" onClick={() => navigate("/")}>
            Home
          </button>
          <div
            className="header__option"
            onClick={() =>
              navigate("/all-movies", { state: { type: "shows" } })
            }
          >
            TV Shows
          </div>
          <div
            className="header__option"
            onClick={() =>
              navigate("/all-movies", { state: { type: "movies" } })
            }
          >
            Movies
          </div>
          <div
            className="header__option"
            onClick={() =>
              navigate("/all-movies", { state: { type: "mylist" } })
            }
          >
            My List
          </div>

          {/* 🔽 Category Dropdown */}
          <div className="header__option dropdown">
            <span
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              Browse by Category ▼
            </span>
            {showCategoryDropdown && (
              <div className="dropdown-menu">
                {[
                  "Action",
                  "Comedy",
                  "Romance",
                  "Horror",
                  "Drama",
                  "Sci-Fi",
                ].map((cat) => (
                  <div
                    key={cat}
                    className="dropdown-item"
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <img
          className="header__avatar"
          src="https://i.pinimg.com/736x/ad/57/b1/ad57b11e313616c7980afaa6b9cc6990.jpg"
          alt="User Avatar"
          onClick={handleAvatarClick}
        />
        <div
          className="header__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>
    </div>
  );
};

export default Header;
