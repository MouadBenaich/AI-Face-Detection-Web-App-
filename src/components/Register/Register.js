import React, { useState } from "react";
import "./Register.css";

const Register = ({ onRouteChange, setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (name.trim() === "") return setError("Name cannot be empty.");
    if (!validateEmail(email)) return setError("Please enter a valid email address.");
    if (password.trim().length < 6) return setError("Password must be at least 6 characters.");

    setLoading(true);

    try {
      const response = await fetch("https://clarifai-backend.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const user = await response.json();

      if (response.ok && user.id) {
        console.log("User registered:", user);
        setUser(user); // ✅ Save user object (id, level, etc.)
        onRouteChange("home");
      } else {
        setError(user || "Unable to register");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <legend>Register</legend>
        <p className="subtitle">Create your SmartBrain account</p>
        {error && <p className="error">{error}</p>}

        <label htmlFor="name">Name</label>
        <input type="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" disabled={loading}>
          {loading ? "Registering…" : "Register"}
        </button>

        <div className="links">
          <a href="#signin" onClick={() => onRouteChange("signin")}>
            Already have an account? Sign in
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
