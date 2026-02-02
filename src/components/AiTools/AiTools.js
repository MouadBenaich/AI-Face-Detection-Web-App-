import React, { useState } from "react";
import "./AiTools.css";

const AiTools = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleSentiment = () => {
    // Placeholder for sentiment analysis API
    if (text.includes("happy")) {
      setResult("Positive sentiment 😊");
    } else if (text.includes("sad")) {
      setResult("Negative sentiment 😢");
    } else {
      setResult("Neutral sentiment 😐");
    }
  };

  return (
    <div className="ai-tools-container">
      <h2>AI Tools</h2>
      <p>Try out basic NLP demos:</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
      />
      <button onClick={handleSentiment}>Analyze Sentiment</button>

      {result && <p className="result">{result}</p>}
    </div>
  );
};

export default AiTools;
