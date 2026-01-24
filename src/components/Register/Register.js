import React, { useState } from "react";
import "./Register.css"; // ✅ reuse the same CSS styling

const Register = ({ onRouteChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ✅ Validation
    if (name.trim() === "") {
      setError("Name cannot be empty.");
      return;
    }
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

    // Simulate async register (replace with real API call)
    setTimeout(() => {
      setLoading(false);
      alert("Registered successfully!"); // Replace with navigation or API response
      onRouteChange("home"); // ✅ go to home after register
    }, 2000);
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <legend>Register</legend>
      <p className="subtitle">Create your SmartBrain account</p>

      {error && <p className="error">{error}</p>}

      <label htmlFor="name">Name</label>
      <input
        type="name"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
