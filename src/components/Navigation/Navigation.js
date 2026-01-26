import React from "react";
import "./Navigation.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav className="nav-bar">
                <button
                    onClick={() => onRouteChange('signin')}
                    className="nav-button"
                >
                    Sign Out
                </button>
            </nav>
        );
    } else {
        return (
            <nav className="nav-bar">
                <button
                    onClick={() => onRouteChange('signin')}
                    className="nav-button"
                >
                    Sign in
                </button>
                <button
                    onClick={() => onRouteChange('register')}
                    className="nav-button"
                >
                    Sign up
                </button>
            </nav>
        );
    }
}
export default Navigation;