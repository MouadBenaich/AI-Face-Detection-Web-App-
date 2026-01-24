import React, { Component } from "react";
import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
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
      box: [],
      route: 'signin',
      isSignedIn: false,
    };
  }
  onRouteChange = (route) =>{
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <ParticlesBackground />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
          ? <div>
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
          : (
            this.state.route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
