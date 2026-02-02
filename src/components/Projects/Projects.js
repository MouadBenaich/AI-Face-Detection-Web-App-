import React from "react";
import "./Projects.css";

const Projects = () => {
  return (
    <div className="projects-container">
      <h2>My Projects</h2>
      <p>Here are some AI and web projects I’ve built:</p>
      <ul>
        <li>
          <strong>AI Face Detection App</strong> – Detects faces in images using Clarifai API.
        </li>
        <li>
          <strong>Portfolio Website</strong> – Responsive design with modern UI/UX.
        </li>
        <li>
          <strong>Todo Manager</strong> – CRUD operations with React and Node.js.
        </li>
      </ul>
    </div>
  );
};

export default Projects;
