import React, { useEffect } from "react";
import "./About.css";

function About() {
  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

    const observerOptions = {
      root: null,
      threshold: 0.3,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => {
      elementsToAnimate.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = () => {
    window.scrollBy({
      top: 1120, // Scrolls down 300px
      left: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  };

  return (
    <div className="about">
      <h1 className="about-h1 animate-on-scroll">Join the Community</h1>
      <p className="about-p animate-on-scroll">
        🎥 Join Bing Today! 🍿 🌟 Unlimited Entertainment, Anytime, Anywhere!
        ✨Access thousands of movies, shows, and exclusives. Stream on any
        device, anytime you want. New releases and originals added every week.
        🔥 Your Next Favorite Show is Just a Click Away! 🎬 Bing – See What’s
        Next.
      </p>
      <button className="about-btn animate-on-scroll" onClick={scrollToSection}>
        Explore
      </button>
    </div>
  );
}

export default About;
