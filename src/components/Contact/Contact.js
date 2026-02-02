import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <p>If you’d like to collaborate or have questions, feel free to reach out!</p>
      
      <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Your name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Your email" />

        <label htmlFor="message">Message</label>
        <textarea id="message" placeholder="Your message"></textarea>

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
