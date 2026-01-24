import React, { useState } from "react";
import "./Signin.css";

const Signin = ({onRouteChange}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    // Simple regex for email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ✅ Validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.trim() === "") {
      setError("Password cannot be empty.");
      return;
    }

    // ✅ Loading state
    setLoading(true);

    // Simulate async sign-in (replace with real API call)
    setTimeout(() => {
      setLoading(false);
      alert("Signed in successfully!"); // Replace with navigation or state change
    }, 2000);
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
        <legend>Sign In</legend>
        <p className="subtitle">Welcome back to SmartBrain</p>

        {error && <p className="error">{error}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="checkbox">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button 
            type="submit" 
            disabled={loading}
            onClick={() => onRouteChange('home')}
        >
            {loading ? "Signing in…" : "Sign In"}
        </button>

        <div className="links pointer">
          <p 
            onClick={() => onRouteChange('register')}
          >
            Sign up
          </p>
          <a href="#forgot">Forgot your password?</a>
        </div>
      
    </form>
  );
};

export default Signin;
