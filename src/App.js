import React, { Component } from "react";
import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import { onInputChange, onButtonSubmit } from "./components/FaceRecognition/FaceApiHelpers";
import "./App.css";
import "tachyons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: []
    };
  }

  render() {
    return (
      <div className="App">
        <ParticlesBackground />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={onInputChange((val) => this.setState({ input: val }))}
          onButtonSubmit={onButtonSubmit(
            this.state.input,
            (val) => this.setState({ imageUrl: val }),
            (val) => this.setState({ box: val })
          )}
        />
        <FaceRecognition
          imageUrl={this.state.imageUrl}
          boxes={this.state.box}
        />
      </div>
    );
  }
}

export default App;
