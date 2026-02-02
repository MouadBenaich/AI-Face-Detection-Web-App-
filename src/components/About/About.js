import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h2>About Me</h2>
      <p>
        I’m Mouad Benaich, a React.js engineer and UI/UX designer passionate
        about AI and web development. My goal is to build interfaces that
        combine technical mastery with psychological impact.
      </p>
      <h3>Skills</h3>
      <ul>
        <li>React.js, JavaScript, Python, Java, C++</li>
        <li>UI/UX design with modern CSS and animations</li>
        <li>API integration and async flows</li>
        <li>Secure deployment workflows with Git, Vercel, Render</li>
      </ul>
      <h3>Vision</h3>
      <p>
        I help companies and recruiters see the power of AI in everyday
        websites, making them smarter, faster, and more engaging.
      </p>
    </div>
  );
};

export default About;