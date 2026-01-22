import React, { Component } from "react";
import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
import "tachyons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: "",
      box: {}
    };
  }
  calculateFaceLocation = (data) => { 
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById("inputImage"); 
    const width = Number(image.width); 
    const height = Number(image.height); 
    return { 
      leftCol: clarifaiFace.left_col * width, 
      topRow: clarifaiFace.top_row * height, 
      rightCol: width - clarifaiFace.right_col * width, 
      bottomRow: height - clarifaiFace.bottom_row * height, 
    }; 
  };
  displayFaceBox = (box) => { 
    this.setState({ box: box }); 
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
  onButtonSubmit = (event) => {
    event.preventDefault();
    this.setState({ imageUrl: this.state.input });

    fetch("https://clarifai-backend.onrender.com/facepp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: this.state.input })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Face++ response:", data);
        if (data.faces && data.faces.length > 0) {
          const face = data.faces[0].face_rectangle;
          const image = document.getElementById("inputImage");
          const width = Number(image.width);
          const height = Number(image.height);

          const box = {
            leftCol: face.left,
            topRow: face.top,
            rightCol: width - (face.left + face.width),
            bottomRow: height - (face.top + face.height),
          };
          this.displayFaceBox(box);
        } else {
          console.log("No face detected");
        }
      })
      .catch((err) => console.error(err));
  };
  render() {
    return (
      <div className="App">
        <ParticlesBackground />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <div className="center">
          <div className="absolute mt2">
            {this.state.imageUrl && (
              <>
                <img 
                  id="inputImage" 
                  src={this.state.imageUrl} 
                  alt="" 
                  width="500px" 
                  height="auto" 
                />
                <div 
                  className="bounding-box" 
                  style={{ 
                    top: this.state.box.topRow, 
                    right: this.state.box.rightCol, 
                    bottom: this.state.box.bottomRow, 
                    left: this.state.box.leftCol, 
                    position: "absolute", // ✅ ensure overlay works 
                    boxShadow: "0 0 0 3px #149df2 inset", // ✅ visible border 
                    cursor: "pointer"
                  }} 
                ></div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
