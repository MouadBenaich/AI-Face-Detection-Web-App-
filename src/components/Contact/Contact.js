import React from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault(); // ✅ stop default form submission

    emailjs.sendForm(
      "service_btclcdr",     // ✅ your Service ID
      "template_an4gpus",    // ✅ your Template ID
      e.target,              // ✅ the form element
      "_aZiChi8fMT7vS5gj"    // ✅ your Public Key
    ).then(
      (result) => {
        alert("Message sent successfully!");
        e.target.reset(); // ✅ clear form after success
      },
      (error) => {
        alert("Failed to send message. Try again later.");
      }
    );
  };

  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <p>If you’d like to collaborate or have questions, feel free to reach out!</p>
      
      {/* ✅ attach sendEmail to onSubmit */}
      <form className="contact-form" onSubmit={sendEmail}>
        <label htmlFor="name">Name</label>
        {/* ✅ name must match template placeholder */}
        <input type="text" id="name" name="from_name" placeholder="Your name" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="reply_to" placeholder="Your email" required />

        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Your message" required />

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
