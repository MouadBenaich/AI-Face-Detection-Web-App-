import React, { useState } from "react";
import "./Register.css";

const Register = ({ onRouteChange }) => {
  const [name, setName] = useState("");
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
    if (name.trim() === "") {
      setError("Name cannot be empty.");
      return;
    }
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
      const response = await fetch(
        "https://clarifai-backend.onrender.com/register", // 🔗 your Render backend URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const user = await response.json();

      if (response.ok && user.id) {
        // ✅ Registration successful
        console.log("User registered:", user);
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
    <form className="signin-form" onSubmit={handleSubmit}>
      <legend>Register</legend>
      <p className="subtitle">Create your SmartBrain account</p>

      {error && <p className="error">{error}</p>}

      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        required
      />

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
        autoComplete="new-password"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Registering…" : "Register"}
      </button>

      <div className="links">
        <a href="#signin" onClick={() => onRouteChange("signin")}>
          Already have an account? Sign in
        </a>
      </div>
    </form>
  );
};

export default Register;
