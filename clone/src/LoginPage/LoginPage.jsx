import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase"; // Ensure the path to firebase is correct
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between sign-up and login
  const [user, setUser] = useState(null); // Track logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error when typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear error when typing
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/"); // Go to homepage after login
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign Up successful!");
      navigate("/"); // Go to homepage after sign up
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully.");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="login-container">
      {user ? (
        <div className="logged-in-message">
          <h2>You're already logged in as {user.email}</h2>
          <button className="login-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <>
          <form
            className="login-form"
            onSubmit={isSignUp ? handleSignUp : handleLogin}
          >
            <div className="login-logo">
              <h2>NetFlix</h2>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className="login-button">
              {isSignUp ? "Sign Up" : "Login"}
            </button>
            <div className="toggle-container">
              <p>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="toggle-link"
                >
                  {isSignUp ? "Login" : "Sign Up"}
                </button>
              </p>
            </div>
          </form>

          {/* Toggle between Sign-Up and Login */}
        </>
      )}
    </div>
  );
};

export default LoginPage;
