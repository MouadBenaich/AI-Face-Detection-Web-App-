import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        {imageUrl && (
          <>
            <img
              id="inputImage"
              src={imageUrl}
              alt=""
              width="500px"
              height="auto"
            />
            {Array.isArray(boxes) &&
              boxes.map((box, i) => (
                <div
                  key={i}
                  className="bounding-box"
                  style={{
                    top: box.topRow + "px",
                    left: box.leftCol + "px",
                    width: box.width + "px",
                    height: box.height + "px",
                    position: "absolute",
                    border: "3px solid #149df2",
                    boxSizing: "border-box",
                    cursor: "pointer"
                  }}
                ></div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
