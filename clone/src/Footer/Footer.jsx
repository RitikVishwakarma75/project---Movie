import React, { useEffect } from "react";
import "./Footer.css";

function Footer() {
  useEffect(() => {
    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

    const observerOptions = {
      root: null, // Observe in the viewport
      threshold: 0.8, // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Add visible class
        } else {
          entry.target.classList.remove("visible"); // Remove it when out of view
        }
      });
    }, observerOptions);

    elementsToAnimate.forEach((el) => {
      observer.observe(el);
    });

    // Cleanup observer on unmount
    return () => {
      elementsToAnimate.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 animate-on-scroll">
            <h3>Bing Box</h3>
            <p>
              This platform is designed for seamless media discovery with
              intuitive UI components. It supports genre and language filtering,
              trailer previews, "My List" features, and aims to deliver a
              perfect movie-watching interface. Built using React.
            </p>
          </div>
          <div className="col-md-4 animate-on-scroll">
            <h3>Contact</h3>
            <ul className="list-unstyled">
              <li>500 Terry Francine Street,</li>
              <li>San Francisco, CA 94158</li>
              <li>info@mysite.com</li>
              <li>Tel: 123-456-7890</li>
            </ul>
          </div>
          <div className="col-md-4 animate-on-scroll">
            <h3>Quick Menu</h3>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/all-movies">Movies</a>
              </li>
              <li>
                <a href="http://127.0.0.1:5500/bingBox.html">Company</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 animate-on-scroll">
            <div className="socials">
              <h3>Socials</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="https://facebook.com/">Facebook</a>
                </li>
                <li>
                  <a href="https://instgram.com/">Instagram</a>
                </li>
                <li>
                  <a href="https://youtube.com/">YouTube</a>
                </li>
                <li>
                  <a href="https://x.com/">X</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
