import React from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const sendEmail = (e) => { 
    e.preventDefault(); 
    emailjs.sendForm( 
      "service_btclcdr",  
      "template_an4gpus", // from EmailJS dashboard
      e.target, // form element 
      "_aZiChi8fMT7vS5gj" // from EmailJS account 
    ).then(
       (result) => { 
        alert("Message sent successfully!"); 
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
