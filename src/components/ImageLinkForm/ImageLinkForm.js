import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div className="image-link-form">
      <p>{"Paste an image URL below and click Detect"}</p>
      <div className="form-container">
        <input 
          id="image-url"              // ✅ added unique id
          name="image-url"            // ✅ added name attribute
          className="input-field" 
          type="text" 
          placeholder="Enter image URL..."
          onChange={onInputChange}
          autoComplete="off"          // ✅ optional: disable autofill if you don’t want it
        />
        <button 
          className="detect-button" 
          type="submit"
          onClick={onButtonSubmit}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
