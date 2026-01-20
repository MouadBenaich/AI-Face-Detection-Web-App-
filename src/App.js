import React, { Component } from "react";
import process from "process";
import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";
import "tachyons";
import Clarifai from "clarifai";
window.process = process;

const app = new Clarifai.App({ 
  apiKey: "ffe597ad60c34ec881cbcacf58e0426e" 
});

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
      rightCol: width - (clarifaiFace.right_col * width), 
      bottomRow: height - (clarifaiFace.bottom_row * height), 
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
    app.models 
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input) 
      .then((response) => {
        const box = this.calculateFaceLocation(response); 
        this.displayFaceBox(box);
      }) 
      .catch((err) => console.error(err));
  }
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
            <img 
              id="inputImage" 
              src={this.state.imageUrl} 
              alt="" 
              width="500px" 
              height="auto" />
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
