  import React, { useEffect } from "react";
  import "./Experiance.css";

  function Experiance() {
    useEffect(() => {
      const productImage = document.querySelector(".product-image");
      const productDescription = document.querySelector(".product-description");

      // Define the Intersection Observer options
      const observerOptions = {
        root: null, // observe in the viewport
        threshold: 0.5, // trigger when 50% of the element is in view
      };

      // Function to handle when an element enters the viewport
      const animateOnScroll = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the 'visible' class when the element is in view
            entry.target.classList.add("visible");
          } else {
            // Remove the 'visible' class when the element goes out of view
            entry.target.classList.remove("visible");
          }
        });
      };

      // Set up the Intersection Observer
      const observer = new IntersectionObserver(animateOnScroll, observerOptions);

      // Start observing the elements
      if (productImage) observer.observe(productImage);
      if (productDescription) observer.observe(productDescription);

      // Cleanup the observer when the component is unmounted
      return () => {
        if (productImage) observer.unobserve(productImage);
        if (productDescription) observer.unobserve(productDescription);
      };
    }, []); // Empty dependency array to run this effect only once after component mounts

    return (
      <div className="product-page">
        <div className="product-image">
          <img
            className="p-img"
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Product Image"
          />
        </div>
        <div className="product-description">
          <h2>Perfect Watching Experience</h2>
          <p>
            Describe the product here. Include important features, pricing and
            other relevant info. Consider adding an image or video of the product.
          </p>
          <button className="explore-button" onClick={()=>{window.open(
            "https://ritikvishwakarma75.github.io/Bing-Box/",
            "_blank"
          );}}>Explore</button>
        </div>
      </div>
    );
  }

  export default Experiance;
