import React, { useState } from "react";
import "./Signin.css";

const Signin = ({ onRouteChange, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Email validation
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Client-side validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // ✅ Call backend API
      const response = await fetch("https://clarifai-backend.onrender.com/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const user = await response.json();

      if (response.ok && user.id) {
        setUser(user); // ✅ Save user object (id, name, level, etc.)
        onRouteChange("home");
      } else {
        setError(user || "Wrong credentials");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
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
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <div className="checkbox">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign In"}
        </button>

        {/* 
          🔧 Optional Dev Bypass 
        <button
          type="button"
          className="dev-bypass"
          onClick={() => {
            setUser({ id: 0, name: "DevUser", email: "dev@test.com", level: "Master" });
            onRouteChange("home");
          }}
        >
          🚀 Dev Bypass 
        </button>
        */}
        <div className="links pointer">
          <p onClick={() => onRouteChange("register")}>Sign up</p>
          <a href="#forgot">Forgot your password?</a>
        </div>
      </form>
    </div>
  );
};

export default Signin;
