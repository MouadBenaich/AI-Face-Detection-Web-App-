import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesOptions = {
  particles: {
    number: { value: 80, density: { enable: true, area: 800 } },
    color: { value: "#00bfffff" },
    shape: { type: "triangles" },
    opacity: { value: 0.5 },
    size: { value: { min: 1, max: 5 } },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      outModes: { default: "bounce" },
    },
    links: {
      enable: true,
      color: "#00ffe1",
      distance: 150,
      opacity: 0.4,
      width: 1,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { quantity: 8 },
    },
  },
  detectRetina: true,
};

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  return ready ? <Particles className="particles" options={particlesOptions} /> : null;
}
