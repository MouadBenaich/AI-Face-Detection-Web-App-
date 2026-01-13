import React from "react";
import Tilt from 'react-parallax-tilt';

const Rank = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        perspective={1000}
        scale={1.05}
        transitionSpeed={1000}
        glareEnable={true}
        glareMaxOpacity={0.45}
        glareColor="#00ffe1"
        glarePosition="all"
        style={{ borderRadius: '12px' }}
      >
        <div className="rank-container">
          <p className="rank-text">Boka, your current rank is...</p>
          <p className="rank-number">#9</p>
        </div>
      </Tilt>
    </div>
  );
};

export default Rank;
