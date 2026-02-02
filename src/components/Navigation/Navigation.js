import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <nav className="nav-bar">
      {isSignedIn ? (
        <>
          {/* Centered glowing links */}
          <div className="nav-center">
            <button
              onClick={() => onRouteChange("home")}
              className="nav-link"
            >
              Home
            </button>
            <button 
                onClick={() => onRouteChange("projects")} 
                className="nav-link">
                Projects
            </button>
            <button 
                onClick={() => onRouteChange("ai-tools")} 
                className="nav-link">
                AI Tools
            </button>
            <button 
                onClick={() => onRouteChange("business")} 
                className="nav-link">
                Business
            </button>
            <button 
                onClick={() => onRouteChange("about")} 
                className="nav-link">
                About
            </button>
            <button
              onClick={() => onRouteChange("contact")}
              className="nav-link"
            >
              Contact Me
            </button>
          </div>

          {/* Right-aligned Sign Out */}
          <div className="nav-right">
            <button
              onClick={() => onRouteChange("signout")}  
              className="nav-button"
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <>
          {/* No Home/Contact when logged out */}
          <div className="nav-right">
            <button
              onClick={() => onRouteChange("signin")}
              className="nav-button"
            >
              Sign In
            </button>
            <button
              onClick={() => onRouteChange("register")}
              className="nav-button"
            >
              Sign Up
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;
