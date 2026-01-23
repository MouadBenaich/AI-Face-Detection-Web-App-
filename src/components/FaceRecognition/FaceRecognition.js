import React, { useRef } from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  const imageRef = useRef(null);

  return (
    <div className="center">
      <div className="absolute mt2">
        {imageUrl && (
          <>
            <img
              ref={imageRef}   // ✅ use ref instead of id
              id="inputImage"  // optional: keep id if you still want it
              src={imageUrl}
              alt=""
              width="500px"
              height="auto"
              onLoad={() => {
                console.log("Image loaded, boxes aligned correctly");
              }}
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
