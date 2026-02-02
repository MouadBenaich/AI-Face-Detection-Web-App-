import React, { Component } from "react";
import ParticlesBackground from "./components/ParticlesBackground/ParticlesBackground";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Contact from "./components/Contact/Contact"; 
import Footer from "./components/Footer/Footer";
import Projects from "./components/Projects/Projects";
import AiTools from "./components/AiTools/AiTools";
import Business from "./components/Business/Business";
import About from "./components/About/About";
import "./App.css";
import "tachyons";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: [],
      route: "signin",
      isSignedIn: false,
      user: {} // ✅ store logged-in user
    };
  }

  setUser = (user) => {
    this.setState({ user });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      // ✅ reset everything and send user to Signin
      this.setState({ isSignedIn: false, user: {}, route: "signin" });
    } else if (route === "home") {
      this.setState({ isSignedIn: true, route: "home" });
    } else {
      this.setState({ route });
    }
  };

  onButtonSubmit = () => {
    fetch("https://clarifai-backend.onrender.com/facepp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: this.state.input,
        userId: this.state.user.id
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.faces) {
          this.setState({ imageUrl: this.state.input, box: data.faces });
          if (data.user) {
            this.setUser(data.user); // ✅ update level
          }
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="App">
        <ParticlesBackground />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        <main>
          {this.state.route === "home" ? (
            <div>
              <Logo />
              <Rank user={this.state.user} /> {/* ✅ show level */}
              <ImageLinkForm
                onInputChange={(val) => this.setState({ input: val })}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition
                imageUrl={this.state.imageUrl}
                boxes={this.state.box}
              />
            </div>

          ) : this.state.route === "signin" ? (
            <Signin onRouteChange={this.onRouteChange} setUser={this.setUser} />
          ) : this.state.route === "register" ? (
            <Register onRouteChange={this.onRouteChange} setUser={this.setUser} />
          ) : this.state.route === "projects" ? (
             <Projects /> 
          ) : this.state.route === "ai-tools" ? ( 
          <AiTools /> 
          ) : this.state.route === "business" ? (
            <Business /> 
          ) : this.state.route === "about" ? (
             <About /> 
          ) : (
            <Contact />
          )}
        </main>
        <Footer /> {/* ✅ Footer always visible */}
      </div>
    );
  }
}

export default App;
