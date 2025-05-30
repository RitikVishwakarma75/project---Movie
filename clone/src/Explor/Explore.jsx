import React, { useEffect, useState } from "react";
import "./Explore.css";

export default function Explore() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`main-container ${visible ? "fade-in" : "opacity-0"}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="glow-title mb-4 text-4xl md:text-5xl font-bold text-red-600">
          🎬 My Netflix Clone
        </h1>
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          This project is a full-featured **Netflix clone web application**
          developed to replicate the core functionality and user experience of
          the popular streaming platform, Netflix. It is built with a strong
          emphasis on clean UI design, responsiveness across devices, and
          integration with real-world APIs. <br />
          <br />
          Users can seamlessly browse a wide variety of movies and TV shows,
          view trailers, and access detailed information about each title. A
          custom-built video player mimics the Netflix viewing experience with a
          focus on performance and usability. <br />
          <br />
          The application is powered by **React.js** for building the user
          interface, and **Tailwind CSS** is used to quickly style and organize
          the layout with utility-first design principles. For authentication
          and user management, **Firebase Authentication** is implemented,
          allowing users to sign in, register, and maintain their own
          watchlists. Movie and TV show data is fetched dynamically from the
          **TMDB (The Movie Database) API**, ensuring a rich and constantly
          updated content feed. <br />
          <br />
          The main goal of this project is to demonstrate real-world skills in
          frontend development, API integration, user authentication, and
          responsive UI design. It also showcases the ability to recreate a
          complex, recognizable platform while improving on it with personal
          flair. Whether you're watching a trailer, searching for the latest
          release, or checking cast info, this clone gives you that smooth
          Netflix-like experience — all in the browser.
        </p>

        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 mb-6">
          <h2 className="text-2xl font-semibold mb-2">🔧 Technologies Used</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>React.js & Tailwind CSS</li>
            <li>Firebase (Authentication + Hosting)</li>
            <li>TMDB API integration</li>
            <li>Custom video player</li>
            <li>Mobile-first responsive design</li>
          </ul>
        </div>

        <div className="mb-6">
          <img
            src="https://via.placeholder.com/800x400?text=Netflix+Clone+Preview"
            alt="Website preview"
            className="rounded-md border border-gray-700 shadow-lg"
          />
        </div>

        <div className="flex gap-4">
          <a
            href="https://your-demo-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="custom-button bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            🚀 Live Demo
          </a>
          <a
            href="https://github.com/yourusername/netflix-clone"
            target="_blank"
            rel="noopener noreferrer"
            className="custom-button border border-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            📁 View Code
          </a>
        </div>
      </div>
    </div>
  );
}
