import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Header/Header.jsx";
import About from "./About/About.jsx";
import Featured from "./Featured/Featured.jsx";
import More from "./More/More.jsx";
import Experiance from "./Experiance/Experiance.jsx";
import Footer from "./Footer/Footer.jsx";
import Allmovies from "./Allmovies/Allmovies.jsx";
import Home from "./Home/Home.jsx";
import LoginPage from "./LoginPage/LoginPage.jsx";
import Explore from "./Explor/Explore.jsx";

function App() {
  return (
    <>
      <Header
        onSearch={(term) => console.log("Search:", term)}
        onGenreChange={(genre) => console.log("Genre:", genre)}
        onToggleTheme={() => console.log("Toggle theme")}
      />
      <Routes>
        {/* Home route with multiple components */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Featured />
              <More />
              <Experiance />
              <Footer />
            </>
          }
        />
        <Route path="/all-movies" element={<Allmovies />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/explore" element={<Explore />} />
        {/* Add more routes for other components if needed */}
      </Routes>
    </>
  );
}

export default App;
